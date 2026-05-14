import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    getAllSubmissions(username: string, password: string): Promise<Array<ContactSubmission>>;
    submitContact(name: string, email: string, message: string): Promise<void>;
}
