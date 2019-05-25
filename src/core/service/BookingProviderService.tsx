import BookingEntry from "../model/BookingEntry";

export default interface BookingProviderService {
    getBookingEntriesByDate(day: string): Promise<BookingEntry>;
}

class BookingProviderServiceImpl implements BookingProviderService {
    getBookingEntriesByDate(day: string): Promise<BookingEntry> {
        return new Promise<BookingEntry>((resolve, reject) => {
            // TODO: marmer 25.05.2019 go on here!
        });
    }
}