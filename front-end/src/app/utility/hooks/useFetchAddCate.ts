import { useState } from "react";
import { AxiosResponse } from "axios";

export interface CateType {
    name: string;
    id: number;
    description: string;
}

export default function useFetchAddCate(fetchApiSearch: (keyword: string) => Promise<AxiosResponse<any, any>>) {
    const [fetchedCates, setFetchedCates] = useState<CateType[]>([]);
    const [selectedCates, setSelectedCates] = useState<CateType[]>([]);
    const handleSearch = async (keyword: string) => {
        try {
            const { data } = await fetchApiSearch(keyword);
            setFetchedCates(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddRemoveCate = (cateItem: CateType) => {
        const index = selectedCates.findIndex((cate: CateType) => cate.id === cateItem.id);
        if (index !== -1) {
            setSelectedCates(selectedCates.filter((_cate: CateType) => _cate.id !== cateItem.id));
        }
        else {
            setSelectedCates([...selectedCates, cateItem]);
        }
    }
    return {
        fetchedCates,
        selectedCates,
        handleSearch,
        handleAddRemoveCate,
    }

}