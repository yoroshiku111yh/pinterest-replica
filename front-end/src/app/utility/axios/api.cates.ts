import { instanceAxios } from ".";
import { ResponseGetPictures } from "./api.image";

interface ResponseGetPicturesByCate extends ResponseGetPictures {
    cate : CatesTypeReponse
}

export interface CatesTypeReponse {
    id: number,
    name: string,
    description: string
}

export const getImagesByCateId = async (idCate: number, page: number): Promise<ResponseGetPicturesByCate> => {
    try {
        const response: ResponseGetPicturesByCate = await instanceAxios.get(`/category/${idCate}/image`, { params: { page: page } });
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