import BookingEntry from "../model/BookingEntry";

export default interface BookingEntryService {
    getBookingEntries(): Promise<BookingEntry[]>;

    create(): BookingEntry;

    delete(bookingEntry: BookingEntry): Promise<BookingEntry>;

    save(bookingEntry: BookingEntry): Promise<BookingEntry>;
}

