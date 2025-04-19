const path = require('path');
const withCss = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');

module.exports = withCss(withPurgeCss({
  purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer,
  purgeCss: {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: ["html", "body"],
  },
}));

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.icons8.com",
      "gartner.com",
      "upload.wikimedia.org",
      "langoly.com",
      "www.coursera.org",
      "thesparksfoundationsingapore.org",
      "media.licdn.com",
      "logosandtypes.com",
      "www.langoly.com",
      "media.licdn.com",
      "www.thesparksfoundationsingapore.org",
      "img.freepik.com",
      "cdn-icons-png.flaticon.com",
      "randomuser.me",
      "i0.wp.com",
      "images.wallpapersden.com"
    ]
  },
  distDir: '.next',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'aos': path.resolve(__dirname, 'node_modules/aos/dist/aos.js'),
    };
    return config;
  },
};


module.exports = { ...nextConfig };
