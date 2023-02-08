import { IsNotEmpty, IsString } from 'class-validator';

export class GetIndexDto {
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
