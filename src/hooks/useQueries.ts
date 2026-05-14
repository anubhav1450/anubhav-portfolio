import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error("Backend not ready");
      await actor.submitContact(name, email, message);
      return { success: true };
    },
  });
}
