import CoreServiceFactory from "./core/service/CoreServiceFactory";
import BookingService from "./core/service/BookingService";
import RestBookingEntryService from "./rest/RestBookingEntryService";
import {TimeService} from "./core/service/TimeService";
import SystemTimeService from "./core/service/SystemTimeService";

export default class DefaultCoreServiceFactory implements CoreServiceFactory {
    getBookingService(day: string): BookingService {
        return new RestBookingEntryService(day);
    }

    getTimeService(): TimeService {
        return new SystemTimeService();
    }
}