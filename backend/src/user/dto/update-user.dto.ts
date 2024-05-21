
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({example : "Update full name user"})
    @IsNotEmpty()
    fullname: string
    @ApiProperty({example : 40})
    age: number
}


export class fieldIdUser {
    @ApiProperty({example : 6})
    id : number
}