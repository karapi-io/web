import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string; // For social media previews
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = "Generate 100% GST-compliant invoices for free. Automate billing with our Developer API. Perfect for Indian freelancers and startups.",
    keywords = "GST invoice generator, free invoice maker India, GST API, e-invoice api, automated billing",
    url = "https://karapi.io",
    image = "https://karapi.io/og-image.jpg" // You should upload a screenshot of your app to public folder
}) => {

    const siteTitle = "KarAPI";
    const fullTitle = `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;