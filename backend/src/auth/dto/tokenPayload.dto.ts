import { PartialType } from '@nestjs/swagger';

export class TokenPayload {
    email: string
    id: number
    fullname: string
    avatar: string
    keyPair: string
}

export class TokenDecodePayload extends TokenPayload {
    iat: number
    exp: number
}
