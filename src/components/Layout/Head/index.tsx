import NextHead from 'next/head';
import React from 'react';

const defaultDescription = 'Full-featured template for next.js applications.';
const defaultOGImage = `/screenshot.jpg`;
const defaultFavicon = '/favicon.ico';
const defaultTitle = 'Nextjs';

export interface HeadProps {
    description?: string;
    ogImage?: string;
    favicon?: string;
    title?: string;
    url?: string;
}

const Head = ({ title, description, url, ogImage, favicon }: HeadProps) => (
    <NextHead>
        <meta charSet='UTF-8' />
        <title>{title || defaultTitle}</title>
        <meta name='description' content={description || defaultDescription} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href={favicon || defaultFavicon} />
        <meta property='og:url' content={url || window.location.hostname} />
        <meta property='og:title' content={title || defaultTitle} />
        <meta property='og:description' content={description || defaultDescription} />
        <meta name='twitter:site' content={url || window.location.hostname} />
        <meta name='twitter:card' content={ogImage || defaultOGImage} />
        <meta name='twitter:image' content={ogImage || defaultOGImage} />
        <meta property='og:image' content={ogImage || defaultOGImage} />
    </NextHead>
);

export default React.memo(Head);
