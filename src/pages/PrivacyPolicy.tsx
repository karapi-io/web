import LegalPageLayout from '../components/LegalPageLayout';

const PrivacyPolicy = () => {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="December 20, 2025">
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                <p>
                    We collect information you provide directly to us when you create an account, generate an invoice, or communicate with us. This may include your name, email address, and transaction details.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>To provide, maintain, and improve our services.</li>
                    <li>To process transactions and send related information, including confirmations and invoices.</li>
                    <li>To respond to your comments, questions, and requests (Customer Support).</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet is 100% secure.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us via our Support Widget.
                </p>
            </section>
        </LegalPageLayout>
    );
};

export default PrivacyPolicy;