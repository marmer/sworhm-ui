import BookingService from "./BookingService";

export default interface CoreServiceFactory {
    getBookingService(day: string): BookingService;
}