import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriaCategoriaDto } from '../dtos/criarCategoria.dto';
import { Categoria } from '../interface/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriaCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada.`);
    }
    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async consultarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().exec();
  }

  async consultarCategoriaPorId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(
        `A categoria informada: ${categoria} não foi encontrada`,
      );
    }
    return categoriaEncontrada;
  }
}
