import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Evento } from '../interface/categoria.interface';

export class AtualizarCategoria {
  @IsString()
  @IsOptional()
  readonly descricao: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}
