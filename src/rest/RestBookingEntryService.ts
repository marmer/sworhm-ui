import Booking from "../core/model/Booking";
import BookingService from "../core/service/BookingService";
import BookingsDto from "../sworhm-data/model/BookingsDto";
import RestEndpoint from "./RestEndpoint";
import uuidv4 from "uuidv4";
import BookingDto from "../sworhm-data/model/BookingDto";

export default class RestBookingRepository implements BookingService {
    private readonly baseUri = "http://backend.de/api/days";
    private resource: string;

    constructor(day: string) {
        this.resource = this.baseUri + "/" + day + "/bookings";
    }

    getAll(): Promise<Booking[]> {
        return new Promise<Booking[]>((resolve, reject) => {
            try {
                new RestEndpoint<BookingsDto>(this.resource)
                    .performGet()
                    .then(bookingsDto => resolve(this.convertToBookings(bookingsDto)))
                    .catch(reject);
            } catch (e) {
                reject();
            }
        });
    }

    createBookingEntry(): Booking {
        return new Booking(uuidv4());
    }

    delete(booking: Booking): Promise<Booking> {
        return new Promise<Booking>(((resolve, reject) => {
            try {
                new RestEndpoint(this.resource + "/" + booking.id)
                    .performDelete()
                    .then(() => resolve(booking))
                    .catch(reject);
            } catch (e) {
                reject();
            }
        }));
    }

    save(booking: Booking): Promise<Booking> {
        return new Promise<Booking>(((resolve, reject) => {
            try {
                const dto: BookingDto = {...booking};
                new RestEndpoint(this.resource + "/" + booking.id)
                    .performPut(dto)
                    .then(() => resolve(booking))
                    .catch(reject);
            } catch (e) {
                reject();
            }
        }));
    }

    private convertToBookings(responseDto: BookingsDto): Booking[] {
        return responseDto
            .entries
            .map((source) => {
                const {id, description, duration, notes, startTime, ticket} = source;
                return {...this.createBookingEntry(), id, description, duration, notes, startTime, ticket};
            });
    }
}