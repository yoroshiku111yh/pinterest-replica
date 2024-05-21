import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class UpdateImageDto{

    @MaxLength(70)
    name : string

    @MaxLength(200)
    description : string

    cates : string
}