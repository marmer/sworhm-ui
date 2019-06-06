import BookingEntry from "../core/model/BookingEntry";
import BookingEntryProviderService from "../core/service/BookingEntryService";
import BookingDayDto from "../sworhm-data/model/BookingDayDto";
import RestEndpoint from "./RestEndpoint";
import uuidv4 from "uuidv4";

export default class RestBookingEntryService implements BookingEntryProviderService {
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

    newBookingEntry(): BookingEntry {
        return new BookingEntry(uuidv4());
    }

    delete(bookingEntry: BookingEntry): Promise<BookingEntry> {
        return new Promise<BookingEntry>(((resolve, reject) => {
            try {
                new RestEndpoint(this.resource + "/entries/" + bookingEntry.id)
                    .performDelete()
                    .then(() => resolve(bookingEntry))
                    .catch(reject);
            } catch (e) {
                reject();
            }
        }));
    }

    private convertToEntries(responseDto: BookingDayDto): BookingEntry[] {
        return responseDto
            .entries
            .map((source) => {
                const {id, description, duration, notes, startTime, ticket} = source;
                return {id, description, duration, notes, startTime, ticket};
            });
    }
}