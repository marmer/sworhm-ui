import BookingEntryDto from "./BookingEntryDto";

export default interface BookingDayResponseDto {
    _links: {
        self: {
            href: string
        },
        last: {
            href: string
        },
        next: {
            href: string
        }
    },
    day: string,
    _embedded: BookingEntryDto[]
}