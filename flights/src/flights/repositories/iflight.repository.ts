import { FlightRequestDTO } from "../dto/flight-request.dto";
import { FlightResponseDTO } from "../dto/flight-response.dto";

export interface IFlightRepository{
    findById(id: string): Promise<FlightResponseDTO>;
    find(): Promise<FlightResponseDTO[]>;
    create(flightRequest: FlightRequestDTO): Promise<FlightResponseDTO>;
    update(id: string, flightRequest: FlightRequestDTO): Promise<FlightResponseDTO>;
    delete(id: string): Promise<FlightResponseDTO>;

}