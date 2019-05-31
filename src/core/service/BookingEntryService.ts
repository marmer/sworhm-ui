import BookingEntry from "../model/BookingEntry";

export default interface BookingEntryService {
    getBookingEntries(): Promise<BookingEntry[]>;

    newBookingEntry(): BookingEntry;

    delete(bookingEntry: BookingEntry): Promise<BookingEntry>;
}

