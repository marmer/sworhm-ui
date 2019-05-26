import BookingEntry from "../model/BookingEntry";

export default interface BookingProviderService {
    getBookingEntriesByDate(day: string): Promise<BookingEntry>;
}

