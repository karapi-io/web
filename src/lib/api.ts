/**
 * API layer: base URL (dev vs prod) and authenticated requests.
 * Set VITE_API_BASE_URL for production and VITE_API_BASE_URL_DEV for development in .env files.
 */

const PROD_BASE = import.meta.env.VITE_API_BASE_URL ?? "https://api.karapi.io";
const DEV_BASE = import.meta.env.VITE_API_BASE_URL_DEV ?? "https://dev.api.karapi.io";

/** Base URL for the backend API (dev or prod depending on environment). */
export function getApiBaseUrl(): string {
    return import.meta.env.DEV ? DEV_BASE : PROD_BASE;
}

/** User + account info returned by the /me (or equivalent) endpoint. */
export interface UserAccountInfo {
    user?: {
        id?: string;
        email?: string;
        [key: string]: unknown;
    };
    account?: Record<string, unknown>;
    [key: string]: unknown;
}

const BOOTSTRAP_PATH = "/identity/auth/bootstrap";

/**
 * Calls POST /auth/bootstrap with the JWT. Use after successful sign-in or sign-up when you have the token.
 * Returns user and account info to store in Redux.
 */
export async function fetchBootstrap(accessToken: string): Promise<UserAccountInfo> {
    const url = `${getApiBaseUrl()}${BOOTSTRAP_PATH}`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Bootstrap API error: ${res.status}`);
    }
    return res.json() as Promise<UserAccountInfo>;
}
