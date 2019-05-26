import BookingEntry from "../core/model/BookingEntry";
import BookingProviderService from "../core/service/BookingProviderService";

export default class RestBookingProviderService implements BookingProviderService {
    getBookingEntriesByDate(day: string): Promise<BookingEntry> {
        return new Promise<BookingEntry>((resolve, reject) => {
            // TODO: marmer 25.05.2019 go on here!
        });
    }
}