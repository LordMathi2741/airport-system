import { Module } from '@nestjs/common';
import { FlightController } from './controller/flight.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
@Module({
    exports: [
    ],
    providers: [
    ],
    controllers: [FlightController],
    imports: [
        ProxyModule
    ],
})
export class FlightModule {}
