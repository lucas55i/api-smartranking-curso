import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criarJogador.dto';
import { Jogador } from '../interfaces/jogador.interface';
import { JogadoresService } from '../services/jogadores.service';
import { JogadoresValidacaoParametosPipe } from '../pipes/jogadore-valicao-prametros.pipe';
import { AtualizarJogadorDto } from '../dtos/atualizar-jogador.dto';
@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoreService: JogadoresService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoreService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', JogadoresValidacaoParametosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoreService.atualizarJogador(
      _id,
      atualizarJogadorDto,
    );
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoreService.consultarJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoreService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deleteJogador(
    @Param('_id', JogadoresValidacaoParametosPipe) _id: string,
  ): Promise<void> {
    this.jogadoreService.deleteJogador(_id);
  }
}
