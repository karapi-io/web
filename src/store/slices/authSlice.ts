import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
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
        },
        setLoading: (state, action: { payload: boolean }) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

export function initAuthListener(dispatch: (action: { type: string; payload?: User | null | boolean }) => void) {
    supabase.auth.getSession()
        .then(({ data: { session } }) => {
            dispatch(setUser(session?.user ?? null));
            dispatch(setLoading(false));
        })
        .catch((err) => {
            console.error("Supabase getSession error:", err);
            dispatch(setLoading(false));
        });

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        dispatch(setUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
}
