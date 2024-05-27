import { instanceAxios } from ".";
import { CatesTypeReponse } from "./api.cates";
import { ResponseDataPicture, ResponseGetPictures } from "./api.image";


export const searchCate = async (keyword: string): Promise<{ data: CatesTypeReponse[] }> => {
    try {
        const response = await instanceAxios.get(`/search/categories/`, {
            params: {
                search: keyword
            }
        });
        return response;
    }
    catch (error: any) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

export interface ResponseSearchApi {
    images: ResponseDataPicture[],
    category: CatesTypeReponse[]
}

export const searchApi = async (keyword: string): Promise<{ data: ResponseSearchApi }> => {
    try {
        const response = await instanceAxios.get(`/search`, {
            params: {
                search: keyword
            }
        });
        return response;
    }
    catch (error: any) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

export const searchListImageByName = async (keyword : string, page : number):Promise<ResponseGetPictures> => {
    try {
        const response : ResponseGetPictures = await instanceAxios.get(`/search/image`, {
            params: {
                search: keyword,
                page : page
            }
        });
        return response;
    }
    catch (error: any) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}