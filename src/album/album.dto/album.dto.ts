/* eslint-disable prettier/prettier */

import {IsDate, IsNotEmpty, IsString} from 'class-validator';

export class AlbumDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly caratula: string;

    @IsDate()
    @IsNotEmpty()
    readonly fechaLanzamiento: Date;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
   
}