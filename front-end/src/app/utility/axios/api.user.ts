import { headersToUpload, instanceAxios } from ".";

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

export const getInfoUserById = async (id: number) => {
    try {
        const response = await instanceAxios.get(`/user/${id}`);
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


export interface ResponseFollowerInfo {
    "user_id": number,
    "following_id": number,
    "createdAt": string,
    "users_following_user_idTousers": {
        "id": number,
        "email": string,
        "fullname": string,
        "avatar": string | null,
        "age": number
    }
}

export interface ResponseGetFollower {
    total: number,
    list: ResponseFollowerInfo[]
}

export const getFollower = async (id: number): Promise<{ data: ResponseGetFollower }> => {
    try {
        const response = await instanceAxios.get(`/user/${id}/follower`);
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

export interface ResponseFollowingInfo {
    "user_id": number,
    "following_id": number,
    "createdAt": string,
    "users_following_following_idTousers": {
        "id": number,
        "email": string,
        "fullname": string,
        "avatar": string | null,
        "age": number
    }
}

export interface ResponseGetFollowing {
    total: number,
    list: ResponseFollowingInfo[]
}

export const getFollowing = async (id: number): Promise<{ data: ResponseGetFollowing }> => {
    try {
        const response = await instanceAxios.get(`/user/${id}/following`);
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

