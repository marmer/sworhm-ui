import BookingEntryDto from "./BookingEntryDto";

export default interface BookingDayDto {
    day: string,
    entries: BookingEntryDto[]
}