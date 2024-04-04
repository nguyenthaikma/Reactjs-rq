import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Space } from 'antd';

import { queryProfile, querySignOut } from '@queries/hooks';
import { getStoredAuth } from '@libs/localStorage';

import styles from '../styles/Home.module.scss';

const MainLayout = dynamic(() => import('@components/Layout'));

const Home = () => {
    const signature = getStoredAuth();
    const { mutate: signOut, isLoading: loadingSignOut } = querySignOut();
    const { data: profile, isFetching, isLoading, isRefetching } = queryProfile();

    useEffect(() => {
        if (!signature) {
            Router.push('/sign-in');
        }
    }, []);

    const handleSignOut = () => {
        void signOut();
    };

    if (!signature) return 'Unauthorized...';

    return (
        <MainLayout title='Home' description='Home description' className={styles.container}>
            <div className={styles.main}>
                {!isLoading && !isFetching && !isRefetching ? (
                    <>
                        <p>{profile?.data?.fullName}</p>
                        <p>{profile?.data?.email}</p>
                    </>
                ) : (
                    <p>Loading profile ...</p>
                )}
                <Space className={styles.grid}>
                    {!signature && (
                        <>
                            <Link href='/sign-in' passHref>
                                <Button type='primary'>Sign In</Button>
                            </Link>
                            <Link href='/register' passHref>
                                <Button type='primary'>Register</Button>
                            </Link>
                        </>
                    )}
                    {signature && (
                        <Button type='primary' loading={loadingSignOut} onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    )}
                </Space>
            </div>
        </MainLayout>
    );
};

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Home;
