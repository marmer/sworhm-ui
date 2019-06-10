import BookingEntry from "../core/model/BookingEntry";
import BookingEntryService from "../core/service/BookingEntryService";
import BookingEntriesDto from "../sworhm-data/model/BookingEntriesDto";
import RestEndpoint from "./RestEndpoint";
import uuidv4 from "uuidv4";
import BookingEntryDto from "../sworhm-data/model/BookingEntryDto";

export default class RestBookingEntryRepository implements BookingEntryService {
    private readonly baseUri = "http://backend.de/api/booking-days";
    private resource: string;

    constructor(day: string) {
        this.resource = this.baseUri + "/" + day + "/entries";
    }

    getAll(): Promise<BookingEntry[]> {
        return new Promise<BookingEntry[]>((resolve, reject) => {
            try {
                new RestEndpoint<BookingEntriesDto>(this.resource)
                    .performGet()
                    .then(bookingDay => resolve(this.convertToEntries(bookingDay)))
                    .catch(reject);
            } catch (e) {
                reject();
            }
        });
    }

    create(): BookingEntry {
        return new BookingEntry(uuidv4());
    }

    delete(bookingEntry: BookingEntry): Promise<BookingEntry> {
        return new Promise<BookingEntry>(((resolve, reject) => {
            try {
                new RestEndpoint(this.resource + "/" + bookingEntry.id)
                    .performDelete()
                    .then(() => resolve(bookingEntry))
                    .catch(reject);
            } catch (e) {
                reject();
            }
        }));
    }

    save(bookingEntry: BookingEntry): Promise<BookingEntry> {
        return new Promise<BookingEntry>(((resolve, reject) => {
            try {
                const dto: BookingEntryDto = {...bookingEntry};
                new RestEndpoint(this.resource + "/" + bookingEntry.id)
                    .performPut(dto)
                    .then(() => resolve(bookingEntry))
                    .catch(reject);
            } catch (e) {
                reject();
            }
        }));
    }

    private convertToEntries(responseDto: BookingEntriesDto): BookingEntry[] {
        return responseDto
            .entries
            .map((source) => {
                const {id, description, duration, notes, startTime, ticket} = source;
                return {...this.create(), id, description, duration, notes, startTime, ticket};
            });
    }
}