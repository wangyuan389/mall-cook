export {}
declare global {
    interface Window {
        electronAPI?: any;//全局变量名
    }
     interface AxiosConfig {
        params?: any
        data?: any
        url?: string
        method?: AxiosMethod
        headersType?: string
        responseType?: AxiosResponseType
    }

     interface IResponse<T = any> {
        code: string
        data: T extends any ? T : T & any
    }
    type AxiosHeaders =
        | 'application/json'
        | 'application/x-www-form-urlencoded'
        | 'multipart/form-data'
}
declare const window: any;


