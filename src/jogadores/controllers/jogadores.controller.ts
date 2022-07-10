import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criarJogador.dto';
import { Jogador } from '../interfaces/jogador.interface';
import { JogadoresService } from '../services/jogadores.service';
import { JogadoresValidacaoParametosPipe } from '../pipes/jogadore-valicao-prametros.pipe';
@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoreService: JogadoresService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoreService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email', JogadoresValidacaoParametosPipe) email: string,
  ): Promise<Jogador | Jogador[]> {
    if (email) {
      return await this.jogadoreService.consultarJogadoreEmail(email);
    } else {
      return await this.jogadoreService.consultarJogadores();
    }
  }

  @Delete()
  async deleteJogador(
    @Query('email', JogadoresValidacaoParametosPipe) email: string,
  ): Promise<void> {
    this.jogadoreService.deleteJogador(email);
  }
}
