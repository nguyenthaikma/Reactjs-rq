export interface SignInPropType {
    email: string;
    password: string;
}

export type Auth = {
    accessToken: string;
    expiredAt: string;
    refreshToken: string;
    email?: string;
};
