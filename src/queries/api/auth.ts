import { SignInPropType } from '@models/auth';

import { request } from './config';

export const singIn = (params: SignInPropType) => request({ url: 'auth/login', method: 'POST', data: params });
export const signOut = (token: string) => request({ url: 'auth/logout', method: 'POST' }, { token });
export const getProfile = (token: string) => request({ url: 'user/profile', method: 'GET' }, { token });
export const getCurrentRoles = (token: string) => request({ url: 'roles/current', method: 'GET' }, { token });
