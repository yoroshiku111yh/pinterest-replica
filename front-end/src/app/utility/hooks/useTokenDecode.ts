import { useEffect, useState } from "react";
import { TokenPayload } from "../type";
import { jwtDecode } from "jwt-decode";
import { localStorageFn } from "../axios";


export default function useTokenDecode() {
    const [token, setToken] = useState<string>("");
    const [decode, setDecode] = useState<TokenPayload | null>(null);
    useEffect(() => {
        setToken(localStorageFn.token);
    }, [])
    useEffect(() => {
        if (token.length > 0) {
            setDecode(jwtDecode(token));
        }
    }, [token]);
    return {
        token,
        decode,
        setToken
    }
}