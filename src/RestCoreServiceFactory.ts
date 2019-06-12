import CoreServiceFactory from "./core/service/CoreServiceFactory";
import BookingService from "./core/service/BookingService";
import RestBookingEntryService from "./rest/RestBookingEntryService";

export default class RestCoreServiceFactory implements CoreServiceFactory {
    getBookingService(day: string): BookingService {
        return new RestBookingEntryService(day);
    }
}