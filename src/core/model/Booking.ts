export default class Booking {
    id: string;
    startTime?: string;
    durationInMinutes?: string;
    description?: string;
    ticket?: string;
    notes?: string;

    constructor(id: string) {
        this.id = id;
    }

    public hasIdOf = (booking: Booking): boolean => this.id === booking.id;
}