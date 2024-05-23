"use client"

import { useCallback, useEffect, useState } from "react";
import { useDebouncedScroll } from "./useDebounceScroll";

export interface FetchPageResponse<T> {
    data: T[];
    totalPage: number;
}

export default function useScrollToLoadMore<T>(fetchPage: (page: number) => Promise<FetchPageResponse<T>>, ref = null) {
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(0);
    const [listData, setListData] = useState<T[]>([]);
    const handleFetch = useCallback(async () => {
        try {
            const res = await fetchPage(page);
            const { data, totalPage } = res;
            if (data.length !== 0) {
                setMaxPage(totalPage);
                setListData((prevList) => [...prevList, ...data]);
            }
        } catch (err) {
            console.log(err);
        }
    }, [page]);
    useEffect(() => {
        if (page > 0) {
            handleFetch();
        }
    }, [page, handleFetch]);
    useDebouncedScroll({
        callback: () => {
            if (maxPage > page) {
                setPage((prevPage) => prevPage + 1);
            }
        },
        element: ref
    });
    return {
        listData
    }
}