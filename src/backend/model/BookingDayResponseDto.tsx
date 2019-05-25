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
    _embedded: {
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
    }[]
}