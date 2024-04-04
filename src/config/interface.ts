export interface statusCode {
    statusCode: number;
}

export interface Message {
    message: string;
}

export type ResApi = statusCode & Message & { data?: any };

export type ResApiErr = statusCode &
    Message & {
        code: number;
        message: string | string[];
        statusText: string;
        status: number | string;
        data: any;
    };
