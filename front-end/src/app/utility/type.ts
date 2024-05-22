export interface TokenPayload {
    email: string
    id: number
    fullname: string
    avatar: string
    keyPair: string
}
export type UserType = Omit<TokenPayload, "keyPair"> & {
    age : number;
};

export interface ResponseUserType {
    info: UserType,
    follower: {
        list: UserType[],
        total: number
    },
    following: {
        list: UserType[],
        total: number
    },
}