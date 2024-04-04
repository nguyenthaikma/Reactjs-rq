import { Message, statusCode } from '@config/interface';

export interface User {
    fullName: string;
    email: string;
    avatar: string;
}

export type UserQuery = statusCode & Message & User;
