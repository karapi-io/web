import LegalPageLayout from '../components/LegalPageLayout';

const RefundPolicy = () => {
    return (
        <LegalPageLayout title="Refund & Cancellation Policy" lastUpdated="December 20, 2025">
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Subscription Cancellations</h2>
                <p>
                    You may cancel your subscription at any time from your account settings. Your access to premium features will continue until the end of your current billing period.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Refund Policy</h2>
                <p>
                    Due to the digital nature of our product (immediate access to tools and downloads), we generally do not offer refunds once a purchase is made. However, if you experienced a technical error that prevented you from using the service, please contact support within 7 days.
                </p>
            </section>
        </LegalPageLayout>
    );
};

export default RefundPolicy;