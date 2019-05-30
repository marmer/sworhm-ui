import BookingEntry from "../core/model/BookingEntry";
import BookingEntryProviderService from "../core/service/BookingProviderService";
import BookingDayDto from "../sworhm-data/model/BookingDayDto";
import RestEndpoint from "./RestEndpoint";

export default class RestBookingEntryProviderService implements BookingEntryProviderService {
    private resource: string;

    constructor(resource: string) {
        this.resource = resource;
    }

    getBookingEntries(): Promise<BookingEntry[]> {
        return new Promise<BookingEntry[]>((resolve, reject) => {

            try {
                new RestEndpoint<BookingDayDto>(this.resource)
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
            .entries
            .map((source) => {
                return {id: source._links.self.href, ...source};
            });
    }
}