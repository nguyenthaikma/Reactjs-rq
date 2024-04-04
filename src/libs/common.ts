/* eslint-disable no-useless-escape */
import { message } from 'antd';
import moment from 'moment';

export const regexPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
export const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
export const regexNumber0100 = /^(0|[1-9][0-9]?|100)$/;

export const isEmail = (email: string) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

export const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const getBase64FileList = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const removeAccents = (str: string) => {
    const AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ',
        'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ',
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
        const re = new RegExp(`[${AccentsMap[i].substr(1)}]`, 'g');
        const char = AccentsMap[i][0];
        // eslint-disable-next-line no-param-reassign
        str = str.replace(re, char);
    }
    return str;
};

export const convertToSlug = (text: string) => {
    const a = removeAccents(text);
    return a
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

export const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export const beforeUploadFileType = (file: any) => {
    const isFileTypes =
        file.type === 'image/JPG' ||
        file.type === 'image/PNG' ||
        file.type === 'application/pdf' ||
        file.type === 'application/doc' ||
        file.type === 'application/ppt' ||
        file.type === 'application/xlsx' ||
        file.type === 'application/xml' ||
        file.type === 'application/ppt';
    if (!isFileTypes) {
        message.error('You can only upload JPG/PNG/PDF/DOC/PPT/XLSX/XML/CSV file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isFileTypes && isLt2M;
};

export const delayKeyUp = (function () {
    let timer: any = 0;
    return function (callback: any, ms: number, that: any) {
        clearTimeout(timer);
        timer = setTimeout(callback.bind(that), ms);
    };
})();

const censorWord = (str: string) => str[0] + '*'.repeat(str.length - 2) + str.slice(-1);

export const censorEmail = (e: string) => {
    const arr = e.split('@');
    return `${censorWord(arr[0])}@${censorWord(arr[1])}`;
};

// disabledDate
export const disabledDateNow = (current: any) =>
    current && (current.valueOf() > Date.now() || current.valueOf() < moment('01/01/1900').unix() * 1000);

// disabled autocomplete select option
export const autocompleteDisabled = () => {
    const el = document.getElementsByClassName('ant-select-selection-search-input');
    const els = document.getElementById('search');
    if (els) {
        els.setAttribute('autoComplete', 'off');
    }
    if (el) {
        for (let i = 0; i < el.length; i++) {
            el[i].setAttribute('autoComplete', 'off');
        }
    }
};

export const containsDecodeComponents = (x: any | string) => decodeURIComponent(x);
export const containsEncodeComponents = (x: any | string) => encodeURIComponent(x);

export const deleteELObjByKey = (obj: any, key: any[] = []) => {
    const newObj = obj;
    if (key && key?.length > 0)
        key.forEach((el) => {
            delete newObj?.[el];
        });
    return newObj;
};

export const convertObjToQuery = (obj: any) => {
    const str = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            str.push(
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key])
                )}`
            );
        }
    }
    return str.join('&');
};

// setCookie
export const setCookie = (cname: string, cValue: string, exDays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cValue};${expires};path=/`;
};

// deleteCookie
export const deleteCookie = (cname: string) => {
    const d = new Date();
    d.setTime(d.getTime() + 0 * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}='';${expires};path=/`;
};

// getCookie
export const getCookie = (cname: string) => {
    const name = `${cname}=`;
    if (process.browser) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
    }
    return '';
};

export const checkCookie = (cname: string) => {
    const cValue = getCookie(cname);
    return cValue;
};
