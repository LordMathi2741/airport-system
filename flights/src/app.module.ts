import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true, 
  }),
  MongooseModule.forRoot(process.env.MONGODB_URI),
  FlightsModule,
 ],
  controllers: [],
  providers: [],
})
export class AppModule {}
