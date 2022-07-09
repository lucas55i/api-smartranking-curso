import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criarJogador.dto';
import { Jogador } from '../interfaces/jogador.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    await this.criar(criarJogadorDto);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, phoneNumber, email } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuid4(),
      nome,
      phoneNumber,
      email,
      ranking: 'A',
      positionRank: 1,
      urlImage: 'www.google.com',
    };
    this.logger.debug(`criaJogadorDto: ${JSON.stringify(jogador)}`);

    this.jogadores.push(jogador);
  }
}
