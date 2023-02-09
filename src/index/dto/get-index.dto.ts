import { IsNotEmpty, IsString } from 'class-validator';

export class IndexDto {
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  unidad_medida: string;

  @IsNotEmpty()
  @IsString()
  fecha: string;

  @IsNotEmpty()
  valor: number;
}

export class GetIndexDto {
  @IsNotEmpty()
  @IsString()
  version: string;

  @IsNotEmpty()
  @IsString()
  autor: string;

  @IsNotEmpty()
  @IsString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  values: IndexDto[];
}
