const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "**";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Robots-Tag", value: "index, follow" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.tiny.cloud",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tiny.cloud",
      "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://img.youtube.com https://www.google-analytics.com https://*.supabase.co",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.resend.com https://res.cloudinary.com https://www.google-analytics.com https://vitals.vercel-insights.com https://*.supabase.co",
      "frame-src 'self' https://www.google.com https://www.youtube.com",
      "media-src 'self' https://res.cloudinary.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join("; ")
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/${cloudinaryCloudName}/**`
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    workerThreads: false,
    cpus: 1
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ];
  },
  async redirects() {
    return [
      // Old profession pages → new courses page with profession filter
      { source: "/services/general-practitioner", destination: "/courses?profession=General%20Practitioner", permanent: true },
      { source: "/services/general-practitioner/", destination: "/courses?profession=General%20Practitioner", permanent: true },
      { source: "/services/general-dentist", destination: "/courses?profession=Dentist", permanent: true },
      { source: "/services/general-dentist/", destination: "/courses?profession=Dentist", permanent: true },
      { source: "/services/physiotherapists", destination: "/courses?profession=Physiotherapist", permanent: true },
      { source: "/services/physiotherapists/", destination: "/courses?profession=Physiotherapist", permanent: true },
      { source: "/services/lab-technician-technologist", destination: "/courses?profession=Lab%20Technician", permanent: true },
      { source: "/services/lab-technician-technologist/", destination: "/courses?profession=Lab%20Technician", permanent: true },
      { source: "/services/microbiologist", destination: "/courses?profession=Microbiologist", permanent: true },
      { source: "/services/microbiologist/", destination: "/courses?profession=Microbiologist", permanent: true },
      { source: "/services/radiographer", destination: "/courses?profession=Radiographer", permanent: true },
      { source: "/services/radiographer/", destination: "/courses?profession=Radiographer", permanent: true },
      { source: "/services/pharmacist", destination: "/courses?profession=Pharmacist", permanent: true },
      { source: "/services/pharmacist/", destination: "/courses?profession=Pharmacist", permanent: true },
      { source: "/services/anesthesia-technicians-technologists", destination: "/courses?profession=Anesthesia%20Technician", permanent: true },
      { source: "/services/anesthesia-technicians-technologists/", destination: "/courses?profession=Anesthesia%20Technician", permanent: true },
      { source: "/services/optometrist", destination: "/courses?profession=Optometrist", permanent: true },
      { source: "/services/optometrist/", destination: "/courses?profession=Optometrist", permanent: true },
      { source: "/services/nurses", destination: "/courses?profession=Nurse", permanent: true },
      { source: "/services/nurses/", destination: "/courses?profession=Nurse", permanent: true },
      { source: "/services/ayurveda-homeo-unani-naturopathy-physicians", destination: "/courses?profession=Ayush%20Physician", permanent: true },
      { source: "/services/ayurveda-homeo-unani-naturopathy-physicians/", destination: "/courses?profession=Ayush%20Physician", permanent: true },

      // Old service pages
      { source: "/services/exam-preparation", destination: "/services/overseas-licensing-exam", permanent: true },
      { source: "/services/exam-preparation/", destination: "/services/overseas-licensing-exam", permanent: true },
      { source: "/services/finishing-school", destination: "/services/career-services", permanent: true },
      { source: "/services/finishing-school/", destination: "/services/career-services", permanent: true },
      { source: "/services/professional-resume-making", destination: "/services/career-services", permanent: true },
      { source: "/services/professional-resume-making/", destination: "/services/career-services", permanent: true },
      { source: "/services/coru-registration", destination: "/courses/coru-registration", permanent: true },
      { source: "/services/coru-registration/", destination: "/courses/coru-registration", permanent: true },

      {
        source: "/article.php",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/blog/:slug",
        permanent: true
      },
      {
        source: "/course.php",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/courses/:slug",
        permanent: true
      },
      {
        source: "/service.php",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/services/:slug",
        permanent: true
      }
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
};

module.exports = nextConfig;
