import BookingEntry from "../model/BookingEntry";

export default interface BookingEntryService {
    getBookingEntries(): Promise<BookingEntry[]>;
}

