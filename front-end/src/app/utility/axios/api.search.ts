import { instanceAxios } from ".";
import { CatesTypeReponse } from "./api.cates";
import { ResponseDataPicture } from "./api.image";


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