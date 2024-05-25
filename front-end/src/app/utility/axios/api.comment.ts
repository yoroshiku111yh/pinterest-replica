import { TypeResponse, instanceAxios } from ".";

export interface ResponseCommentType {
    id : number,
    user_id : number,
    image_id : number,
    content : string,
    createdAt : string,
    users : {
        id : number,
        fullname : string,
        avatar : string
    }
}

export interface ResponseGetComment extends TypeResponse {
    data: ResponseCommentType[],
    currentPage: number,
    pageSize: number,
    totalPage: number
}

export const getCommentByIdImage = async (idUser: number, page: number): Promise<ResponseGetComment> => {
    try {
        const response: ResponseGetComment = await instanceAxios.get(`/image/${idUser}/comment`, {
            params: {
                page: page
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