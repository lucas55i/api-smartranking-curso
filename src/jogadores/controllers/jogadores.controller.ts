import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criarJogador.dto';
import { JogadoresService } from '../services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoreService: JogadoresService) {}
  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoreService.criarAtualizarJogador(criarJogadorDto);
  }
}
