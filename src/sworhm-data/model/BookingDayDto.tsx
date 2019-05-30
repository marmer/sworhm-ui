import BookingEntryDto from "./BookingEntryDto";

export default interface BookingDayDto {
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
    _embedded: {
        entries: BookingEntryDto[]
    }
}