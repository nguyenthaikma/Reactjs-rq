import React, { HTMLAttributes, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

import Head, { HeadProps } from './Head';

const Header = dynamic(() => import('./Header'), {
    ssr: false,
});
const Footer = dynamic(() => import('./Footer'), {
    ssr: false,
});

type PageProps = PropsWithChildren<HeadProps> &
    HTMLAttributes<HTMLDivElement> & {
        mainClassName?: string;
    };

const MainLayout = (props: PageProps) => {
    const { children, className } = props;
    return (
        <>
            <Head {...props} />
            <Header />
            <main className='site' id='page'>
                <div className={`container-nextjs ${className || ''}`}>{children}</div>
            </main>
            <Footer />
        </>
    );
};
export default React.memo(MainLayout);
