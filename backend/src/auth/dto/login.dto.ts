import { ApiProperty } from "@nestjs/swagger";

import { IsEmail, IsNotEmpty } from "class-validator";


export class loginDto {
    @ApiProperty({ example: "user@example.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    ////
    @ApiProperty({ example: "123456" })
    @IsNotEmpty()
    password: string;
    ////
}