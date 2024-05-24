import { instanceAxios } from ".";


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