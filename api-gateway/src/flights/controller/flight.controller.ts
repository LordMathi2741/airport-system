import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";;

import { FlightRequestDTO } from "../dto/flight-request.dto";
import { ClientProxyFlight } from "src/common/proxy/client-proxy";
import { FlightMSG } from "src/common/constants";

@Controller("api/v1/flights")
export class FlightController {
    constructor(private readonly clientProxy: ClientProxyFlight) {}
    private _clientProxyFlight = this.clientProxy.clientProxyFlight;

    @Get()
    getFlights()  {
        return this._clientProxyFlight.send(FlightMSG.GET_FLIGHTS, {});
    }

    @Get(':id')
    getFlightById(@Param('id') id: string) {
        return this._clientProxyFlight.send(FlightMSG.GET_FLIGHT_BY_ID, id);
    }

    @Post()
    createFlight(@Body() createFlightDto: FlightRequestDTO) {
        return this._clientProxyFlight.send(FlightMSG.CREATE_FLIGHT, createFlightDto);
    }

    @Put(":id")
    updateFlight(@Param("id") id: string, @Body() updateFlightDto: FlightRequestDTO) {
        return this._clientProxyFlight.send(FlightMSG.UPDATE_FLIGHT, { id, ...updateFlightDto });
    }

    @Delete(":id")
    deleteFlight(@Param("id") id: string) {
        return this._clientProxyFlight.send(FlightMSG.DELETE_FLIGHT, id);
    }

    

}
