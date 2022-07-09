import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criarJogador.dto';
import { Jogador } from '../interfaces/jogador.interface';
import { JogadoresService } from '../services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoreService: JogadoresService) {}
  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoreService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadoreService.consultarJogadores();
  }
}
