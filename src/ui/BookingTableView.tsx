import React, {Component} from 'react';
import BookingView from "./BookingView";
import Booking from "../core/model/Booking";
import BookingService from "../core/service/BookingService";
import CoreServiceFactory from "../core/service/CoreServiceFactory";

interface BookingTableViewState {
    bookingEntries: Booking[];
}

export interface BookingTableViewProps {
    coreServicesFactory: CoreServiceFactory;
    day: string;
}

export default class BookingTableView extends Component<BookingTableViewProps, BookingTableViewState> {

    private readonly bookingEntryService: BookingService;

    constructor(props: Readonly<BookingTableViewProps>) {
        super(props);
        this.bookingEntryService = this.props.coreServicesFactory.getBookingService(this.props.day);

        this.state = {
            bookingEntries: []
        };

        this.loadBookings();
    }

    render(): React.ReactElement {
        return <div className="table-responsive-sm ">
            <table className="table table-sm">
                <colgroup>
                    <col className="bookingStartTime"/>
                    <col className="bookingDuration"/>
                    <col className="bookingDescription"/>
                    <col className="bookingTicket"/>
                    <col className="bookingNotes"/>
                    <col className="bookingActions"/>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col" className="text-sm-center">Start</th>
                    <th scope="col" className="text-sm-center">Duration in Minutes</th>
                    <th scope="col" className="text-sm-center">Description</th>
                    <th scope="col" className="text-sm-center">Ticket</th>
                    <th scope="col" className="text-sm-center">Notes</th>
                    <th scope="col" className="text-sm-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.entryRows()}
                </tbody>
            </table>
        </div>;
    }

    private newBookingEntry() {
        return this.bookingEntryService.createBookingEntry();
    }

    private loadBookings() {
        this.bookingEntryService.getAll()
            .then(value =>
                this.setState({
                    bookingEntries: value.length === 0 ? [this.bookingEntryService.createBookingEntry()] : value
                }))
            .catch(reason => {
                // TODO: marmer 16.06.2019 create some visible error state and retry it again
                console.error("error on bookings load", reason);
            }).finally(
            () => console.log("finally loading should be over")
        );
    }

    private entryRows() {
        return this.state.bookingEntries.map(this.toBookingEntryRowView);
    }

    private toBookingEntryRowView = (entry: Booking) => {
        return <BookingView key={entry.id}
                            onAdd={this.addNewRowAfter}
                            onRemove={this.removeEntry}
                            onUpdate={this.updateEntry}
                            entry={entry}/>;
    };

    private addNewRowAfter = (bookingEntry: Booking) => {
        const entries = [...this.state.bookingEntries];
        const index = entries.indexOf(bookingEntry);
        entries.splice(index + 1, 0, this.newBookingEntry());

        this.setState({
            bookingEntries: entries
        });
    };


    private updateEntry = (updatedEntry: Booking): void => {
        const bookingEntries: Booking[] = [...this.state.bookingEntries];
        bookingEntries[this.entryIndexOf(updatedEntry)] = updatedEntry;
        this.setState({bookingEntries: bookingEntries});

        this.bookingEntryService.save(updatedEntry);
        // TODO: marmer 10.06.2019 Handle unsuccessful tries
    };

    private entryIndexOf(updatedEntry: Booking) {
        return this.state.bookingEntries.findIndex(value => value.hasIdOf(updatedEntry));
    }

    private removeEntry = (entryToDelete: Booking) => {
        this.bookingEntryService.delete(entryToDelete)
            .then((deletedEntry) => {
                const bookingEntries = [...this.state.bookingEntries];
                bookingEntries.splice(bookingEntries.indexOf(deletedEntry), 1);
                this.setState({
                    bookingEntries: (bookingEntries && bookingEntries.length > 0 ?
                        bookingEntries :
                        [this.newBookingEntry()])
                });
            })
    }
}


