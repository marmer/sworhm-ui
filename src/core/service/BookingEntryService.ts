import BookingEntry from "../model/BookingEntry";

export default interface BookingEntryService {
    getAll(): Promise<BookingEntry[]>;

    createBookingEntry(): BookingEntry;

    delete(bookingEntry: BookingEntry): Promise<BookingEntry>;

    save(bookingEntry: BookingEntry): Promise<BookingEntry>;
}

