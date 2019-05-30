export default class BookingEntry {
    id: string;
    startTime?: string;
    duration?: string;
    description?: string;
    ticket?: string;
    notes?: string;

    constructor(id: string) {
        this.id = id;
    }
}