import Booking from "../model/Booking";

export default interface BookingService {
    getAll(): Promise<Booking[]>;

    createBookingEntry(): Booking;

    delete(booking: Booking): Promise<Booking>;

    save(booking: Booking): Promise<Booking>;
}

