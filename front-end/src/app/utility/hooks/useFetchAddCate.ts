import { useState } from "react";
import { CatesTypeReponse } from "../axios/api.cates";


export default function useFetchAddCate(fetchApiSearch: (keyword: string) => Promise<{ data: CatesTypeReponse[] }>) {
    const [fetchedCates, setFetchedCates] = useState<CatesTypeReponse[]>([]);
    const [selectedCates, setSelectedCates] = useState<CatesTypeReponse[]>([]);
    const handleSearch = async (keyword: string) => {
        try {
            const { data } = await fetchApiSearch(keyword);
            setFetchedCates(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddRemoveCate = (cateItem: CatesTypeReponse) => {
        const index = selectedCates.findIndex((cate: CatesTypeReponse) => cate.id === cateItem.id);
        if (index !== -1) {
            setSelectedCates(selectedCates.filter((_cate: CatesTypeReponse) => _cate.id !== cateItem.id));
        }
        else {
            setSelectedCates([...selectedCates, cateItem]);
        }
    }
    return {
        fetchedCates,
        selectedCates,
        setSelectedCates,
        handleSearch,
        handleAddRemoveCate,
    }

}