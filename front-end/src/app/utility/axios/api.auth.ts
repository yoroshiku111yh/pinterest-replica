import { instanceAxios } from ".";


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