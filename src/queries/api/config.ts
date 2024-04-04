import axios, { AxiosRequestConfig } from 'axios';

import { API_TIMEOUT, API_ENDPOINT, BASE_URL } from '@src/config/api';
import logger from '@libs/logger';

const client = axios.create({
    baseURL: API_ENDPOINT,
    timeout: API_TIMEOUT,
    timeoutErrorMessage: '🚧🚧🚧 Server connection time out !',
    headers: {
        Accept: 'application/json',
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        responseEncoding: 'utf8',
        responseType: 'json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': BASE_URL || '*',
        'X-Application': 'web app',
        'X-Version': '1.0.1',
    },
});

export const request = async ({ ...options }: AxiosRequestConfig, additional?: { lang?: string; token?: string }) => {
    client.defaults.headers.common.Authorization = `Bearer ${additional?.token || undefined}`;

    client.defaults.headers.common.lang = additional?.lang || 'en';

    const onSuccess = (response: any) => {
        logger.debug('Response API:', response?.data);
        return response?.data;
    };
    const onError = async (error: any) => {
        logger.debug('Axios Options:', options);
        // optionally catch errors and add additional logging here
        await Promise.reject({
            statusCode: error?.response?.data?.statusCode,
            message: error?.response?.data?.message,
            statusText: error?.response?.statusText,
            status: error?.response?.status,
            data: error?.response?.data?.data || null,
        });
    };
    return client(options).then(onSuccess).catch(onError);
};
