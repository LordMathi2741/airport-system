import { Inject, Injectable } from "@nestjs/common";
import { FlightRequestDTO } from "../dto/flight-request.dto";
import { FlightResponseDTO } from "../dto/flight-response.dto";
import { IFlightService } from "./iflight.service";
import { IFlightRepositoryToken } from "../repositories/flight.repository";
import { IFlightRepository } from "../repositories/iflight.repository";

@Injectable()
export class FlightService implements IFlightService{
    constructor(
        @Inject(IFlightRepositoryToken) private readonly flightRepository:IFlightRepository
         ){}
    async findById(id: string): Promise<FlightResponseDTO> {
        const flightFound = await this.flightRepository.findById(id);
        return new FlightResponseDTO(flightFound.id, flightFound.origin, flightFound.destination, flightFound.date, flightFound.price, flightFound.duration);
    }
    async find(): Promise<FlightResponseDTO[]> {
        const flightsFound = await this.flightRepository.find();
        return flightsFound.map(flight => new FlightResponseDTO(flight.id, flight.origin, flight.destination, flight.date, flight.price, flight.duration));
    }

    async create(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
        const flightCreated = await this.flightRepository.create(flightRequest);
        return new FlightResponseDTO(flightCreated.id, flightCreated.origin, flightCreated.destination, flightCreated.date, flightCreated.price, flightCreated.duration);
    }
    async update(id: string, flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
        const flightUpdated = await this.flightRepository.update(id, flightRequest);
        return new FlightResponseDTO(flightUpdated.id, flightUpdated.origin, flightUpdated.destination, flightUpdated.date, flightUpdated.price, flightUpdated.duration);
    }
    async delete(id: string): Promise<FlightResponseDTO> {
        const flightDeleted = await this.flightRepository.delete(id);
        return new FlightResponseDTO(flightDeleted.id, flightDeleted.origin, flightDeleted.destination, flightDeleted.date, flightDeleted.price, flightDeleted.duration);
    }

}

export const IFlightServiceToken = "IFlightServiceToken"