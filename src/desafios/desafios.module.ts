import { Module } from '@nestjs/common';
import { DesafiosService } from './service/desafios.service';
import { DesafiosController } from './controller/desafios.controller';

@Module({
  providers: [DesafiosService],
  controllers: [DesafiosController],
})
export class DesafiosModule {}
