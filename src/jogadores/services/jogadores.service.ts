import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criarJogador.dto';
import { Jogador } from '../interfaces/jogador.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      return this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadoreEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não`);
    }
    return jogadorEncontrado;
  }

  async deleteJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
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
    this.logger.debug(`Criar Jogador: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
