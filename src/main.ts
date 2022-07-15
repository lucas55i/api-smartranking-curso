import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExeceptionsFilter } from './common/filters/http-execption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExeceptionsFilter());
  await app.listen(8080);
}
bootstrap();
