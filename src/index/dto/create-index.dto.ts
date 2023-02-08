import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateIndexDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['asc', 'desc'])
  order: string;

  @IsNotEmpty()
  @IsString()
  field: string;
}
