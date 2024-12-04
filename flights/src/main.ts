import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  const flightApp = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQL_URL],
      queue:  RabbitMQ.FlightQueue, 
      queueOptions: {
        durable: true, 
      },
    },
  });
  await flightApp.listen();
}
bootstrap();