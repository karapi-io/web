import { useState, useEffect } from "react";
import { FileText, CheckCircle2, Clock, Shield } from "lucide-react";

interface KarapiLoaderProps {
    message?: string;
    variant?: "invoice" | "minimal" | "professional";
}

export default function KarapiLoader({ message = "Loading...", variant = "invoice" }: KarapiLoaderProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev < 3 ? prev + 1 : prev));
        }, 500);
        return () => clearInterval(timer);
    }, []);

    if (variant === "invoice") {
        return (
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                <div className="text-center">
                    {/* Document workflow animation */}
                    <div className="mb-8 relative">
                        {/* Background glow */}
                        <div className="absolute -inset-8 bg-gradient-to-r from-violet-100 to-blue-100 rounded-full blur-3xl opacity-50"></div>
                        
                        {/* Animated document stack */}
                        <div className="relative w-48 h-48 mx-auto">
                            {/* Back document */}
                            <div className={`absolute inset-0 bg-white rounded-2xl border-2 border-slate-200 shadow-lg transition-all duration-700 ${step >= 2 ? 'translate-x-4 -translate-y-4 opacity-30' : ''}`}>
                                <div className="p-6 space-y-3">
                                    <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                                    <div className="h-12 bg-slate-100 rounded mt-4"></div>
                                </div>
                            </div>
                            
                            {/* Middle document */}
                            <div className={`absolute inset-0 bg-white rounded-2xl border-2 border-slate-300 shadow-xl transition-all duration-700 ${step >= 1 ? 'translate-x-2 -translate-y-2 opacity-50' : ''}`}>
                                <div className="p-6 space-y-3">
                                    <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-300 rounded w-1/2"></div>
                                    <div className="h-12 bg-slate-200 rounded mt-4"></div>
                                </div>
                            </div>
                            
                            {/* Front document with kar{API} */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-violet-200 shadow-2xl">
                                <div className="p-6">
                                    {/* Logo */}
                                    <div className="text-2xl font-bold mb-4">
                                        <span className="text-slate-900">kar</span>
                                        <span className="text-violet-600">{'{'}</span>
                                        <span className="text-violet-500">API</span>
                                        <span className="text-blue-600">{'}'}</span>
                                    </div>
                                    
                                    {/* Processing steps */}
                                    <div className="space-y-2 text-left text-xs">
                                        <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-30'}`}>
                                            {step >= 1 ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <Clock className="w-4 h-4 text-violet-500 animate-spin" />
                                            )}
                                            <span className={step >= 1 ? 'text-emerald-600 font-semibold' : 'text-slate-600'}>Verifying credentials</span>
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                                            {step >= 2 ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : step >= 1 ? (
                                                <Clock className="w-4 h-4 text-violet-500 animate-spin" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                            )}
                                            <span className={step >= 2 ? 'text-emerald-600 font-semibold' : step >= 1 ? 'text-slate-600' : 'text-slate-400'}>Loading workspace</span>
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                                            {step >= 2 ? (
                                                <Clock className="w-4 h-4 text-violet-500 animate-spin" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                            )}
                                            <span className={step >= 2 ? 'text-slate-600' : 'text-slate-400'}>Preparing dashboard</span>
                                        </div>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700 ease-out"
                                            style={{ width: `${(step / 2) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                
                                {/* Shield badge */}
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm font-medium">{message}</p>
                </div>
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="text-4xl font-bold tracking-tight mb-2">
                            <span className="text-slate-900">kar</span>
                            <span className="text-violet-600">{'{'}</span>
                            <span className="text-violet-500">API</span>
                            <span className="text-blue-600">{'}'}</span>
                        </div>
                    </div>
                    
                    {/* Elegant spinner */}
                    <div className="w-12 h-12 mx-auto mb-6">
                        <div className="w-full h-full border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin"></div>
                    </div>
                    
                    <p className="text-slate-600 text-sm">{message}</p>
                </div>
            </div>
        );
    }

    // Professional variant - Clean and corporate
    return (
        <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-50">
            <div className="text-center max-w-md px-6">
                {/* Logo */}
                <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-xl">
                    <FileText className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                
                {/* Brand */}
                <div className="text-3xl font-bold tracking-tight mb-3">
                    <span className="text-slate-900">kar</span>
                    <span className="text-violet-600">{'{'}</span>
                    <span className="text-violet-500">API</span>
                    <span className="text-blue-600">{'}'}</span>
                </div>
                
                <p className="text-slate-600 mb-8">Invoice Management Platform</p>
                
                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                
                <p className="text-sm text-slate-500">{message}</p>
            </div>
        </div>
    );
}
