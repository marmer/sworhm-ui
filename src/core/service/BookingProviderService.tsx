import BookingEntry from "../model/BookingEntry";

export default interface BookingProviderService {
    getBookingEntries(): Promise<BookingEntry[]>;
}

