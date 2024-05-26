import { instanceAxios } from ".";
import { ResponseGetPictures } from "./api.image";


export interface CatesTypeReponse {
    id: number,
    name: string,
    description: string
}

export const getImagesByCateId = async (idCate: number, page: number): Promise<ResponseGetPictures> => {
    try {
        const response: ResponseGetPictures = await instanceAxios.get(`/category/${idCate}/image`, { params: { page: page } });
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