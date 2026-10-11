import { useSyncExternalStore } from "react";

/**
 * Live LeetCode stats shared by every component that shows them (Hero, Skills),
 * so there is a single fetch + a single polling timer no matter how many
 * components subscribe.
 *
 * Source order: alfa-leetcode-api (solved + contest + profile) -> the older
 * faisalshohag proxy -> last good response cached in localStorage -> hard-coded
 * fallback. `source` tells the UI which one it is showing so stale data is never
 * presented as live.
 */

export const LEETCODE_USERNAME = "Anubhav9457";
export const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  acceptanceRate: number;
  ranking: number;
  contestRating: number | null;
  contestTopPercentage: number | null;
  contestsAttended: number | null;
}

export type LeetCodeSource = "live" | "cached" | "fallback";

export interface LeetCodeState {
  stats: LeetCodeStats;
  source: LeetCodeSource;
  updatedAt: number | null;
  loading: boolean;
}

// Snapshot of the real profile (matches the resume); only used if no live or cached data exists.
const FALLBACK: LeetCodeStats = {
  totalSolved: 605,
  easySolved: 294,
  mediumSolved: 257,
  hardSolved: 54,
  totalQuestions: 4073,
  acceptanceRate: 71.2,
  ranking: 141642,
  contestRating: 1817,
  contestTopPercentage: 7.66,
  contestsAttended: 31,
};

const CACHE_KEY = `leetcode-stats:${LEETCODE_USERNAME}`;
const REFRESH_MS = 5 * 60 * 1000;
const TIMEOUT_MS = 20_000; // free hosting can cold-start; the UI shows cached data meanwhile

const ALFA = "https://alfa-leetcode-api.onrender.com";
const FAISAL = "https://leetcode-api-faisalshohag.vercel.app";

interface SubmissionCount {
  submissions?: number;
}
interface AlfaSolved {
  solvedProblem?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  acSubmissionNum?: SubmissionCount[];
  totalSubmissionNum?: SubmissionCount[];
}
interface AlfaContest {
  contestRating?: number;
  contestTopPercentage?: number;
  contestAttend?: number;
}
interface AlfaProfile {
  ranking?: number;
}
interface FaisalStats {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  totalQuestions?: number;
  acceptanceRate?: number;
  ranking?: number;
}

async function getJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;

function acceptance(data: AlfaSolved): number | null {
  const ac = num(data.acSubmissionNum?.[0]?.submissions);
  const total = num(data.totalSubmissionNum?.[0]?.submissions);
  return ac !== null && total ? Math.round((ac / total) * 1000) / 10 : null;
}

async function fetchFromAlfa(prev: LeetCodeStats): Promise<LeetCodeStats> {
  const u = encodeURIComponent(LEETCODE_USERNAME);
  const [solved, contest, profile] = await Promise.allSettled([
    getJson<AlfaSolved>(`${ALFA}/${u}/solved`),
    getJson<AlfaContest>(`${ALFA}/${u}/contest`),
    getJson<AlfaProfile>(`${ALFA}/${u}`),
  ]);
  if (solved.status !== "fulfilled") throw solved.reason;
  const s = solved.value;
  const total = num(s.solvedProblem);
  if (total === null || total <= 0) throw new Error("alfa: no solved count");
  const c = contest.status === "fulfilled" ? contest.value : null;
  const p = profile.status === "fulfilled" ? profile.value : null;
  const rating = num(c?.contestRating);
  return {
    totalSolved: total,
    easySolved: num(s.easySolved) ?? prev.easySolved,
    mediumSolved: num(s.mediumSolved) ?? prev.mediumSolved,
    hardSolved: num(s.hardSolved) ?? prev.hardSolved,
    totalQuestions: FALLBACK.totalQuestions,
    acceptanceRate: acceptance(s) ?? prev.acceptanceRate,
    ranking: num(p?.ranking) ?? prev.ranking,
    contestRating: rating !== null ? Math.round(rating) : prev.contestRating,
    contestTopPercentage:
      num(c?.contestTopPercentage) ?? prev.contestTopPercentage,
    contestsAttended: num(c?.contestAttend) ?? prev.contestsAttended,
  };
}

async function fetchFromFaisal(): Promise<LeetCodeStats> {
  const d = await getJson<FaisalStats>(`${FAISAL}/${encodeURIComponent(LEETCODE_USERNAME)}`);
  const total = num(d.totalSolved);
  if (total === null || total <= 0) throw new Error("faisal: no solved count");
  return {
    totalSolved: total,
    easySolved: num(d.easySolved) ?? FALLBACK.easySolved,
    mediumSolved: num(d.mediumSolved) ?? FALLBACK.mediumSolved,
    hardSolved: num(d.hardSolved) ?? FALLBACK.hardSolved,
    totalQuestions: num(d.totalQuestions) ?? FALLBACK.totalQuestions,
    acceptanceRate: num(d.acceptanceRate) ?? FALLBACK.acceptanceRate,
    ranking: num(d.ranking) ?? FALLBACK.ranking,
    contestRating: FALLBACK.contestRating,
    contestTopPercentage: FALLBACK.contestTopPercentage,
    contestsAttended: FALLBACK.contestsAttended,
  };
}

function readCache(): { stats: LeetCodeStats; updatedAt: number } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.stats && num(parsed.stats.totalSolved) && num(parsed.updatedAt))
      return parsed;
  } catch {
    /* storage unavailable or corrupt: ignore */
  }
  return null;
}

function writeCache(stats: LeetCodeStats, updatedAt: number) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ stats, updatedAt }));
  } catch {
    /* ignore */
  }
}

// ---- tiny external store -------------------------------------------------
const cached = readCache();
let state: LeetCodeState = cached
  ? {
      stats: cached.stats,
      source: "cached",
      updatedAt: cached.updatedAt,
      loading: true,
    }
  : { stats: FALLBACK, source: "fallback", updatedAt: null, loading: true };

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let inflight: Promise<void> | null = null;

function setState(next: LeetCodeState) {
  state = next;
  for (const l of listeners) l();
}

function refresh(): Promise<void> {
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      let stats: LeetCodeStats;
      try {
        stats = await fetchFromAlfa(state.stats);
      } catch {
        stats = await fetchFromFaisal();
      }
      const now = Date.now();
      writeCache(stats, now);
      setState({ stats, source: "live", updatedAt: now, loading: false });
    } catch {
      // Keep whatever we had (cached or fallback); just stop the loading state.
      setState({
        ...state,
        source: state.updatedAt ? "cached" : "fallback",
        loading: false,
      });
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

function onVisibility() {
  if (document.visibilityState === "visible") void refresh();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    void refresh();
    timer = setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, REFRESH_MS);
    document.addEventListener("visibilitychange", onVisibility);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      if (timer) clearInterval(timer);
      timer = null;
      document.removeEventListener("visibilitychange", onVisibility);
    }
  };
}

export function useLeetCodeStats(): LeetCodeState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}
