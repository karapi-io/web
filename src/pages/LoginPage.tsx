import { useEffect, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import KarapiLoader from "../components/KarapiLoader";

export default function LoginPage() {
    const { isAuthenticated, signInWithPassword, signInWithOAuth, signUp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const redirectTo = (location.state as { from?: string })?.from || "/";

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, navigate, redirectTo]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail || !password) {
            setError("Email and password are required.");
            setIsLoading(false);
            return;
        }
        try {
            if (mode === "signup") {
                const { needsEmailConfirmation } = await signUp(normalizedEmail, password);
                if (needsEmailConfirmation) {
                    setSuccess("Check your email to confirm your account. Then sign in below.");
                    setMode("signin");
                } else {
                    navigate(redirectTo, { replace: true });
                }
            } else {
                await signInWithPassword(normalizedEmail, password);
                navigate(redirectTo, { replace: true });
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : mode === "signup" ? "Sign up failed." : "Sign in failed. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setSuccess(null);
        setIsLoading(true);
        try {
            await signInWithOAuth(redirectTo);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Google sign in failed. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !error) {
        return (
            <KarapiLoader
                variant="invoice"
                message={mode === "signup" ? "Creating your account..." : "Signing you in..."}
            />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
            {/* Subtle grid – invoice/paper feel */}
            <div
                className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgb(226 232 240 / 0.6) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(226 232 240 / 0.6) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative w-full max-w-[400px]">
                {/* Document-style card with left accent */}
                <div className="bg-white rounded-xl shadow-lg shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
                    {/* Invoice-style accent bar */}
                    <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-500" />

                    <div className="px-8 pt-8 pb-8">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight">KarAPI</h1>
                                <p className="text-xs text-slate-500 font-medium">Invoice workspace</p>
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm mb-4">
                            {mode === "signup"
                                ? "Create an account to start with GST-compliant invoices."
                                : "Sign in to create and manage GST-compliant invoices."}
                        </p>

                        {/* Toggle Sign in / Sign up */}
                        <div className="flex rounded-lg border border-slate-200 p-0.5 mb-4 bg-slate-50">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode("signin");
                                    setError(null);
                                    setSuccess(null);
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === "signin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                            >
                                Sign in
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMode("signup");
                                    setError(null);
                                    setSuccess(null);
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                            >
                                Create account
                            </button>
                        </div>

                        {success && (
                            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm flex items-center gap-2">
                                <span className="shrink-0 w-1 h-4 rounded-full bg-emerald-500" />
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm flex items-center gap-2">
                                <span className="shrink-0 w-1 h-4 rounded-full bg-red-400" />
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50"
                        >
                            <svg viewBox="0 0 533.5 544.3" className="w-5 h-5">
                                <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.4-34-4-50.2H272v95h146.9c-6.4 34.8-25.6 64.4-54.4 84.3v69.9h87.9c51.4-47.4 81.1-117.2 81.1-199z" />
                                <path fill="#34A853" d="M272 544.3c73.7 0 135.5-24.4 180.6-66.3l-87.9-69.9c-24.4 16.4-55.7 26-92.7 26-71 0-131.1-47.9-152.6-112.1H28.1v70.4C73 478.6 165.1 544.3 272 544.3z" />
                                <path fill="#FBBC05" d="M119.4 322c-10.2-30.8-10.2-64.1 0-94.9V156.7H28.1c-39.6 78.9-39.6 171.9 0 250.8l91.3-70.5z" />
                                <path fill="#EA4335" d="M272 107.7c39.9-.6 78.5 14.6 107.9 42.8l80.6-80.6C413 25.3 344.6-1.1 272 0 165.1 0 73 65.7 28.1 156.7l91.3 70.4C140.9 155.6 201 107.7 272 107.7z" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="relative my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 py-1 bg-white text-xs font-medium text-slate-400 rounded-full border border-slate-200">
                                    or with email
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={mode === "signup" ? "Min 6 characters" : "••••••••"}
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none disabled:opacity-50 transition-colors"
                            >
                                {mode === "signup" ? "Create account" : "Sign in"}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <p className="mt-5 text-center text-xs text-slate-400">
                    GST-compliant invoicing for India. Secure sign-in.
                </p>
            </div>
        </div>
    );
}
