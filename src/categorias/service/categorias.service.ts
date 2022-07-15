import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/services/jogadores.service';
import { AtualizarCategoria } from '../dtos/atualizarCAtegoria.dto';
import { CriaCategoriaDto } from '../dtos/criarCategoria.dto';
import { Categoria } from '../interface/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
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
    return await this.categoriaModel.find().populate('jogadores').exec();
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

  async atualizarCategoria(
    categoria: string,
    atualizarCategoria: AtualizarCategoria,
  ): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(
        `A categoria informada: ${categoria}, não foi encontrada`,
      );
    }

    await this.categoriaModel
      .findByIdAndUpdate({ categoria }, { atualizarCategoria })
      .exec();
  }

  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    // Parametros da url
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];

    // Categoria existe
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    // Busca jogadores cadastrado na categorias.
    const jogadorEmCategoria = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador)
      .exec();

    //Utilização de modulos externos.
    await this.jogadoresService.consultarJogadorPeloId(idJogador);

    if (!categoriaEncontrada) {
      throw new BadRequestException(
        `A categoria informada: ${categoria}, não foi encontrada`,
      );
    }

    if (jogadorEmCategoria.length > 0) {
      throw new BadRequestException(
        `Jogador com o ID: ${idJogador}, Já cadastrado na categoria informada: ${categoria}`,
      );
    }

    // Incrementado o objeto recuperado do banco (categoria)
    // Como a o schema de categoria já possue relação com  jogadores,
    //  é só adicionar o jogador apartir do id ao array de jogadores
    categoriaEncontrada.jogadores.push(idJogador);
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();
  }
}
