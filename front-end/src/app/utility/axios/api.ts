import { TypeResponse, headersToUpload, instanceAxios } from "."


export interface LoginDataType {
    email: string,
    password: string
}
export const loginApi = async (loginData: LoginDataType) => {
    try {
        const response = await instanceAxios.post("/auth/login", loginData);
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


export interface RegisterDataType {
    email: string,
    password: string,
    fullname: string,
    age: number
}

export const registerApi = async (registerData: RegisterDataType) => {
    try {
        const response = await instanceAxios.post("/auth/register", registerData);
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

export const getProfile = async () => {
    try {
        const response = await instanceAxios.get(`/user`);
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


export const refreshToken = async () => {
    try {
        const response = await instanceAxios.post(`/auth/refresh-token`);
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

export interface UpdateInfoUserType {
    age: number,
    fullname: string,
    avatar: File | null
}

export const updateInfoUser = async (dataInfo: UpdateInfoUserType) => {
    try {
        const response = await instanceAxios.put(`/user/edit`, dataInfo, { headers: headersToUpload });
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


export const checkIsFollowed = async (id: number) => {
    try {
        const response = await instanceAxios.get(`/user/follow/${id}`);
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

export const toggleFollow = async (id: number) => {
    try {
        const response = await instanceAxios.post(`/user/follow/${id}`);
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

export const searchCate = async (keyword: string) => {
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
    height: number
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