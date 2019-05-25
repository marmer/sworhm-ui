export default interface BookingEntryDto {
    _links: {
        self: {
            href: string
        }
    },
    startTime: string,
    duration: string,
    description: string,
    ticket: string,
    notes: string
}