import BookingEntryService from "./BookingEntryService";

export default interface CoreServiceFactory {
    getBookingEntryService(day: string): BookingEntryService;
}