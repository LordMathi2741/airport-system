import { Module } from '@nestjs/common';
import { FlightController } from './controller/flight.controller';
import { FlightRepository, IFlightRepositoryToken } from './repositories/flight.repository';
import { FlightService, IFlightServiceToken } from './services/flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './schema/flight.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]), 
    ],
    providers:[
        {
            provide: IFlightRepositoryToken,
            useClass: FlightRepository,
        },
        {
            provide: IFlightServiceToken,
            useClass: FlightService,
        }
    ],
    exports: [IFlightRepositoryToken, IFlightServiceToken],
    controllers: [FlightController],
})
export class FlightsModule {}
