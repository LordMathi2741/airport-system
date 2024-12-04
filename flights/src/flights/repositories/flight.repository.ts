import { InjectModel } from "@nestjs/mongoose";
import { FlightRequestDTO } from "../dto/flight-request.dto";
import { FlightResponseDTO } from "../dto/flight-response.dto";
import { IFlightRepository } from "./iflight.repository";
import { Flight} from "../schema/flight.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FlightRepository implements IFlightRepository{

    constructor(@InjectModel(Flight.name) private readonly flightModel: Model<Flight>){}
    async findById(id: string): Promise<FlightResponseDTO> {
       const flight = await this.flightModel.findById(id);
       return new FlightResponseDTO(flight._id.toString(), flight.orgin, flight.destination, flight.date, flight.price, flight.duration);
    }
    async find(): Promise<FlightResponseDTO[]> {
        const flights = await this.flightModel.find();
        return flights.map(flight => new FlightResponseDTO(flight._id.toString(), flight.orgin, flight.destination, flight.date, flight.price, flight.duration));
    }
    async create(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
        const flightCreated = await this.flightModel.create(flightRequest);
        return new FlightResponseDTO(flightCreated._id.toString(), flightCreated.orgin, flightCreated.destination, flightCreated.date, flightCreated.price, flightCreated.duration);
    }
    async update(id: string, flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
        const flightUpdated = await this.flightModel.findByIdAndUpdate(id, flightRequest, {new: true});
        return new FlightResponseDTO(flightUpdated._id.toString(), flightUpdated.orgin, flightUpdated.destination, flightUpdated.date, flightUpdated.price, flightUpdated.duration);
    }
    async delete(id: string): Promise<FlightResponseDTO> {
        const flightDeleted = await this.flightModel.findByIdAndDelete(id);
        return new FlightResponseDTO(flightDeleted._id.toString(), flightDeleted.orgin, flightDeleted.destination, flightDeleted.date, flightDeleted.price, flightDeleted.duration);
    }

}

export const IFlightRepositoryToken = "IFLlightRepositoryToken";