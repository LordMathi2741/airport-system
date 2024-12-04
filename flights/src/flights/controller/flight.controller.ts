import { Controller, Inject } from "@nestjs/common";
import { IFlightServiceToken } from "../services/flight.service";
import { IFlightService } from '../services/iflight.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FlightMSG } from "src/common/constants";
import { FlightResponseDTO } from "../dto/flight-response.dto";

@Controller("api/v1/flights")
export class FlightController{
    constructor(@Inject(IFlightServiceToken) private readonly flightService: IFlightService){}

    @MessagePattern(FlightMSG.GET_FLIGHT_BY_ID)
    async findById(@Payload() id: string): Promise<FlightResponseDTO> {
        return await this.flightService.findById(id);
    }

    @MessagePattern(FlightMSG.GET_FLIGHTS)
    async findAll(): Promise<FlightResponseDTO[]> {
        return await this.flightService.find();
    }

    @MessagePattern(FlightMSG.CREATE_FLIGHT)
    async create(@Payload() flight: FlightResponseDTO): Promise<FlightResponseDTO> {
        return await this.flightService.create(flight);
    }

    @MessagePattern(FlightMSG.UPDATE_FLIGHT)
    async update(@Payload() flight: any): Promise<FlightResponseDTO> {
        return await this.flightService.update(flight.id, flight);
    }

    @MessagePattern(FlightMSG.DELETE_FLIGHT)
    async delete (@Payload() id: string){
        return await this.flightService.delete(id);
    }

    

}