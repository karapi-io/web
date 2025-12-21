import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const TermsOfService = () => {
    return (
        <LegalPageLayout title="Terms of Service" lastUpdated="December 20, 2025">
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                    By accessing or using our Invoice Generator and related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use of Service</h2>
                <p>
                    You agree to use the service only for lawful purposes. You are responsible for all content you generate using our tools. We reserve the right to terminate accounts that use our service for illegal activities.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Limitation of Liability</h2>
                <p className="uppercase text-sm font-semibold tracking-wide text-gray-500">Important</p>
                <p>
                    To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                </p>
            </section>
        </LegalPageLayout>
    );
};

export default TermsOfService;