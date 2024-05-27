import { ApiProperty } from "@nestjs/swagger";

import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

// export class registerDto {
//     //@ApiProperty({ type: 'string' })
//     email: string;
//     //@ApiProperty({ type: 'string' })
//     password: string; // same as key upload
// }


export class registerDto {
    @ApiProperty({ example: "user@example.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    ////
    @ApiProperty({ example: "123456" })
    @IsNotEmpty()
    password : string;
    ////
    @ApiProperty({ example: "elizabeth kiki" })
    @MaxLength(30, { message: "Fullname cannot be longer than 30 characters" })
    @IsNotEmpty()
    fullname : string;
    ////
    @ApiProperty({ example: 12 })
    age : number
    avatar : string
}