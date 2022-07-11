import { Body, Controller, Post } from '@nestjs/common';
import { CriaCategoriaDto } from '../dtos/criarCategoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor() {}

  @Post()
  async criarCategoria(@Body() criarCategoriaDto: CriaCategoriaDto) {}
}
