export default interface BookingDto {
    id: string
    startTime?: string,
    durationInMinutes?: string,
    description?: string,
    ticket?: string,
    notes?: string
}