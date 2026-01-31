import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
    signInWithPassword as signInWithPasswordThunk,
    signInWithOAuth as signInWithOAuthThunk,
    signUp as signUpThunk,
    logout as logoutThunk,
} from "../store/slices/authSlice";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const signInWithPassword = useCallback(
        (email: string, password: string) => dispatch(signInWithPasswordThunk({ email, password })).unwrap(),
        [dispatch]
    );
    const signInWithOAuth = useCallback(
        (redirectTo?: string) => dispatch(signInWithOAuthThunk(redirectTo)).unwrap(),
        [dispatch]
    );
    const signUp = useCallback(
        (email: string, password: string) => dispatch(signUpThunk({ email, password })).unwrap(),
        [dispatch]
    );
    const logout = useCallback(() => dispatch(logoutThunk()).unwrap(), [dispatch]);

    return {
        isAuthenticated: !!user,
        userEmail: user?.email ?? null,
        user,
        isLoading,
        signInWithPassword,
        signInWithOAuth,
        signUp,
        logout,
    };
}
