import React from 'react';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, children }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-blue-600 px-8 py-10 text-white">
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="mt-2 text-blue-100 text-sm opacity-90">
                        Last Updated: {lastUpdated}
                    </p>
                </div>

                {/* Content - Using 'prose' styling manually for nice typography */}
                <div className="px-8 py-10 text-gray-700 leading-relaxed space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LegalPageLayout;