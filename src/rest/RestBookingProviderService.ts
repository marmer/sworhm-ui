import BookingEntry from "../core/model/BookingEntry";
import BookingProviderService from "../core/service/BookingProviderService";
import BookingDayDto from "../sworhm-data/model/BookingDayDto";
import RestEndpoint from "./RestEndpoint";

export default class RestBookingProviderService implements BookingProviderService {
    getBookingEntriesByDate(day: string): Promise<BookingEntry[]> {
        return new Promise<BookingEntry[]>((resolve, reject) => {

            try {
                new RestEndpoint<BookingDayDto>("http://backend.de/api/booking-days/" + day)
                    .performGet()
                    .then(bookingDay => resolve(this.convertToEntries(bookingDay)))
                    .catch(reject);
            } catch (e) {
                reject();
            }

        });
    }

    private convertToEntries(responseDto: BookingDayDto): BookingEntry[] {
        return responseDto
            ._embedded
            .map((source) => {
                return {id: source._links.self.href, ...source};
            });
    }
}