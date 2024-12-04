import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";  // Asegúrate de importar Types
import { Flight } from "../schema/flight.schema";
import { FlightRequestDTO } from "../dto/flight-request.dto";
import { FlightResponseDTO } from "../dto/flight-response.dto";
import { IFlightRepository } from "./iflight.repository";

@Injectable()
export class FlightRepository implements IFlightRepository {
  constructor(@InjectModel(Flight.name) private readonly flightModel: Model<Flight>) {}

  async findById(id: string): Promise<FlightResponseDTO> {
    const objectId = new Types.ObjectId(id);
    
    const flight = await this.flightModel.findById(objectId);  // Usar el ObjectId para la búsqueda

    if (!flight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }

    return new FlightResponseDTO(
      flight._id.toString(),
      flight.origin,
      flight.destination,
      flight.date,
      flight.price,
      flight.duration,
    );
  }

  async find(): Promise<FlightResponseDTO[]> {
    const flights = await this.flightModel.find();
    return flights.map(
      (flight) =>
        new FlightResponseDTO(
          flight._id.toString(),
          flight.origin,
          flight.destination,
          flight.date,
          flight.price,
          flight.duration,
        ),
    );
  }

  async create(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
    const flightCreated = await this.flightModel.create(flightRequest);
    return new FlightResponseDTO(
      flightCreated._id.toString(),
      flightCreated.origin,
      flightCreated.destination,
      flightCreated.date,
      flightCreated.price,
      flightCreated.duration,
    );
  }

  async update(id: string, flightRequest: FlightRequestDTO): Promise<FlightResponseDTO> {
    const objectId = new Types.ObjectId(id);
    
    const flightUpdated = await this.flightModel.findByIdAndUpdate(
      objectId, 
      flightRequest,
      { new: true }
    );

    if (!flightUpdated) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }

    return new FlightResponseDTO(
      flightUpdated._id.toString(),
      flightUpdated.origin,
      flightUpdated.destination,
      flightUpdated.date,
      flightUpdated.price,
      flightUpdated.duration,
    );
  }

  async delete(id: string): Promise<FlightResponseDTO> {
    const objectId = new Types.ObjectId(id);

    const flightDeleted = await this.flightModel.findByIdAndDelete(objectId);
    if (!flightDeleted) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }

    return new FlightResponseDTO(
      flightDeleted._id.toString(),
      flightDeleted.origin,
      flightDeleted.destination,
      flightDeleted.date,
      flightDeleted.price,
      flightDeleted.duration,
    );
  }
}

export const IFlightRepositoryToken = "IFlightRepositoryToken";
