import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";

@Injectable()
export class ClientProxyFlight {
    private readonly _clientProxyFlight: ClientProxy;

    constructor(private readonly config: ConfigService) {
        this._clientProxyFlight = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get("AMQL_URL"),
                queue: RabbitMQ.FlightQueue,
            },
        });
    }

    get clientProxyFlight(): ClientProxy {
        return this._clientProxyFlight;
    }
}
