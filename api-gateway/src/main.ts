import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/http-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Airport Service documentation')
    .setDescription('The Airport Service documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
