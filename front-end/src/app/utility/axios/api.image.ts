import { TypeResponse, headersToUpload, instanceAxios } from ".";

export interface UploadImageType {
    image: File,
    name: string,
    description: string,
    cates: string
}

export const uploadImage = async (data: UploadImageType) => {
    try {
        const response = await instanceAxios.post(`/image/upload`, data, { headers: headersToUpload });
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

export interface ResponseDataPicture {
    id: number,
    name: string,
    description: string,
    user_id: number,
    deleted: boolean,
    thumbnail_url: string,
    createdAt: string,
    url: string,
    width: number,
    height: number,
    isSaved: boolean
}

interface ResponseGetPictures extends TypeResponse {
    data: ResponseDataPicture[],
    currentPage: number,
    pageSize: number,
    totalPage: number
}

export const getListPicture = async (page: number): Promise<ResponseGetPictures> => {
    try {
        const response: ResponseGetPictures = await instanceAxios.get(`/image`, { params: { page: page } });
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

interface ResponseIsInteract {
    data: {
        isSaved: boolean,
        isLiked: boolean
    }
}

export const checkIsInteract = async (id: number): Promise<ResponseIsInteract> => {
    try {
        const response = await instanceAxios.get(`/image/${id}/interact`);
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

export const toggleSaveImage = async (id: number) => {
    try {
        const response = await instanceAxios.post(`/image/${id}/save`);
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

export const toggleLikeImage = async (id: number) => {
    try {
        const response = await instanceAxios.post(`/image/${id}/like`);
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

export const getTotalLikes = async (id: number) => {
    try {
        const response = await instanceAxios.get(`/image/${id}/total/like`);
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