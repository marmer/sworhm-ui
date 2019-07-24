import BookingService from "./BookingService";
import {TimeService} from "./TimeService";

export default interface CoreServiceFactory {
    getBookingService(day: string): BookingService;

    getTimeService(): TimeService;
}