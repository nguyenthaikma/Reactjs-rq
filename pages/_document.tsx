import Document, { Html, Main, NextScript, DocumentContext, Head } from 'next/document';
import Script from 'next/script';

const { GTM_ID } = process.env;

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App: any) => App,
                enhanceComponent: (Component: any) => Component,
            });
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=optional'
                        rel='stylesheet'
                    />
                    {GTM_ID && (
                        <Script
                            id='gtag'
                            strategy='lazyOnload'
                            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
                        />
                    )}
                    {GTM_ID && (
                        <Script id='gtag-init' strategy='lazyOnload'>
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', '${GTM_ID}');
                            `}
                        </Script>
                    )}
                </Head>
                <body className='body'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
export default MyDocument;
