import { instanceAxios } from ".";
import { CatesTypeReponse } from "./api.cates";


export const searchCate = async (keyword: string):Promise<{data : CatesTypeReponse[]}> => {
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