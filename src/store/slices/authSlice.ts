import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { fetchBootstrap, type UserAccountInfo } from "../../lib/api";

interface AuthState {
    user: User | null;
    userProfile: UserAccountInfo | null;
    isLoading: boolean;
    userProfileLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    userProfile: null,
    isLoading: true,
    userProfileLoading: false,
};

export const signInWithPassword = createAsyncThunk(
    "auth/signInWithPassword",
    async ({ email, password }: { email: string; password: string }) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    }
);

export const signInWithOAuth = createAsyncThunk(
    "auth/signInWithOAuth",
    async (redirectTo?: string) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: redirectTo ? `${window.location.origin}${redirectTo}` : window.location.href },
        });
        if (error) throw error;
    }
);

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }: { email: string; password: string }) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return { needsEmailConfirmation: !data.session };
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await supabase.auth.signOut();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: { payload: User | null }) => {
            state.user = action.payload;
            if (!action.payload) state.userProfile = null;
        },
        setLoading: (state, action: { payload: boolean }) => {
            state.isLoading = action.payload;
        },
        setUserProfile: (state, action: { payload: UserAccountInfo | null }) => {
            state.userProfile = action.payload;
        },
        setUserProfileLoading: (state, action: { payload: boolean }) => {
            state.userProfileLoading = action.payload;
        },
    },
});

export const { setUser, setLoading, setUserProfile, setUserProfileLoading } = authSlice.actions;
export default authSlice.reducer;

async function syncUserProfile(
    accessToken: string,
    dispatch: (action: { type: string; payload?: User | null | boolean | UserAccountInfo }) => void
) {
    dispatch(setUserProfileLoading(true));
    try {
        const profile = await fetchBootstrap(accessToken);
        dispatch(setUserProfile(profile));
    } catch (err) {
        console.error("Bootstrap (auth/bootstrap) failed:", err);
        dispatch(setUserProfile(null));
    } finally {
        dispatch(setUserProfileLoading(false));
    }
}

export function initAuthListener(dispatch: (action: { type: string; payload?: User | null | boolean | UserAccountInfo }) => void) {
    supabase.auth.getSession()
        .then(({ data: { session } }) => {
            dispatch(setUser(session?.user ?? null));
            dispatch(setLoading(false));
            if (session?.user && session.access_token) {
                syncUserProfile(session.access_token, dispatch);
            }
        })
        .catch((err) => {
            console.error("Supabase getSession error:", err);
            dispatch(setLoading(false));
        });

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        dispatch(setUser(session?.user ?? null));
        if (session?.user && session.access_token) {
            syncUserProfile(session.access_token, dispatch);
        }
    });

    return () => subscription.unsubscribe();
}
