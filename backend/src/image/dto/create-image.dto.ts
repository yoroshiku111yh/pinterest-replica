import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto { }

interface DataCompressed {
    path : string,
    format : string,
    width : number,
    height : number,
    channels : number,
    premultiplied : boolean,
    size : number,
    filename : string
}

export class FileCompressed {
    original : DataCompressed
    thumb : DataCompressed
}


