import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
            },
            {
                protocol: 'https',
                hostname: 'skillicons.dev',
            }
        ]
    },

    // The V1 rework merged the standalone /skills, /education, … pages into
    // homepage anchor sections and moved the legal pages. Permanently redirect
    // the old URLs so previously-indexed links keep their SEO value.
    async redirects() {
        const sectionAnchors = ['about', 'skills', 'education', 'gallery', 'experiences', 'contact'];

        return [
            ...sectionAnchors.map((section) => ({
                source: `/${section}`,
                destination: `/#${section}`,
                permanent: true
            })),
            { source: '/legal/privacy', destination: '/privacy-policy', permanent: true },
            { source: '/legal/terms', destination: '/terms', permanent: true }
        ];
    }
};

export default withNextIntl(nextConfig);