/* eslint-disable prettier/prettier */

import {IsNotEmpty, IsString} from 'class-validator';

export class PerformerDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly imagen: number;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: number;
   
}