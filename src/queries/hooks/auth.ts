import { useMutation, useQuery, useQueryClient } from 'react-query';
import Router from 'next/router';
import { notification } from 'antd';

import logger from '@libs/logger';
import { getCurrentRoles, getProfile, signOut, singIn } from '@queries/api';
import { USER_CURRENT_ROLE, USER_PROFILE } from '@queries/keys';
import { ResApi, ResApiErr } from '@config/interface';
import { clearStoredAuth, getStoredAuth, setStoredAuth } from '@libs/localStorage';

/**
 * @method querySignIn
 * @returns
 */
export const querySignIn = () => {
    const queryClient = useQueryClient();
    return useMutation(singIn, {
        onSuccess: (data: ResApi) => {
            if (data.statusCode === 200) {
                setStoredAuth(data.data);
                queryClient.invalidateQueries(USER_PROFILE);
                Router.push('/');
            } else {
                void clearStoredAuth();
                queryClient.setQueryData(USER_PROFILE, null);
                notification.error({ message: data.message });
            }
        },
        onError: (error: ResApiErr) => {
            logger.error('🚀 ~ querySignIn ~ error', error);
            void clearStoredAuth();
            queryClient.setQueryData(USER_PROFILE, null);
            notification.error({ message: error.message });
        },
    });
};

/**
 * @method querySignOut
 * @return
 */
export const querySignOut = () => {
    const queryClient = useQueryClient();
    const accessToken = getStoredAuth()?.accessToken || '';
    return useMutation(() => signOut(accessToken), {
        onSuccess: (data: ResApi) => {
            logger.debug('SignOut data:', data);
            // Todo
        },
        onError: (error: ResApiErr) => {
            logger.debug('SignOut error:', error);
            // Todo
        },
        onSettled: (data, error, variables, context) => {
            logger.debug('onSettled', data, error, variables, context);
            queryClient.setQueryData(USER_PROFILE, null);
            void clearStoredAuth();
            Router.push('/sign-in');
        },
    });
};

/**
 * @method queryProfile
 * @returns
 */
export const queryProfile = () => {
    const accessToken = getStoredAuth()?.accessToken || '';
    return useQuery(USER_PROFILE, () => getProfile(accessToken), {
        enabled: !!accessToken,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

/**
 * @method queryCurrentRole
 * @returns
 */
export const queryCurrentRole = () => {
    const accessToken = getStoredAuth()?.accessToken || '';
    return useQuery(USER_CURRENT_ROLE, () => getCurrentRoles(accessToken), {
        enabled: !!accessToken,
    });
};
