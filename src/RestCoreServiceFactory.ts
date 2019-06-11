import CoreServiceFactory from "./core/service/CoreServiceFactory";
import BookingEntryService from "./core/service/BookingEntryService";
import RestBookingEntryService from "./rest/RestBookingEntryService";

export default class RestCoreServiceFactory implements CoreServiceFactory {
    getBookingEntryService(day: string): BookingEntryService {
        return new RestBookingEntryService(day);
    }
}