const path = require('path');

const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const { i18n } = require('./next-i18next.config');

const nextConfig = {
    env: {
        APP_ENV: process.env.APP_ENV || 'development',
        BASE_URL: process.env.BASE_URL || 'http://localhost:3200',
        API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:3200/api',
        GTM_ID: process.env.GTM_ID,

        API_TIMEOUT: process.env.API_TIMEOUT,
        CODE_SUCCESS: process.env.CODE_SUCCESS,
        CODE_TIME_OUT: process.env.CODE_TIME_OUT,
        EXPIRED_TOKEN: process.env.EXPIRED_TOKEN,
        NETWORK_ERROR: process.env.NETWORK_ERROR,
        TIME_ERROR: process.env.TIME_ERROR,
    },
    poweredByHeader: false,
    reactStrictMode: true,
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    i18n,
    webpack: (config) => {
        const conf = config;
        conf.plugins = conf.plugins.filter((plugin) => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin');

        conf.watchOptions = {
            aggregateTimeout: 300,
            poll: 5000,
            ignored: ['**/.git', '**/.next', '**/node_modules', '**/public/static'],
        };

        return config;
    },
};

module.exports = withPlugins([withImages], nextConfig);
