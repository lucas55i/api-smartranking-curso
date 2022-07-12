import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriaCategoriaDto } from '../dtos/criarCategoria.dto';
import { Categoria } from '../interface/categoria.interface';
import { CategoriasService } from '../service/categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriaCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriaService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaService.consultarCategorias();
  }

  @Get('/:categoria')
  async consultarCategoriaPorId(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return await this.categoriaService.consultarCategoriaPorId(categoria);
  }
}
