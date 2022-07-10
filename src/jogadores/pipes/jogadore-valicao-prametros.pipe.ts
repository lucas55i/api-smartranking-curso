import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JogadoresValidacaoParametosPipe implements PipeTransform {
  //Pipes criados pelo desenvolvedor.
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `O valor do parametro ${metadata.data} Deve ser informado.`,
      );
    }

    return value;
  }
}
