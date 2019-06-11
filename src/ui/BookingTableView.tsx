import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";
import BookingEntry from "../core/model/BookingEntry";
import BookingEntryService from "../core/service/BookingEntryService";

interface BookingTableViewState {
    bookingEntries: BookingEntry[];
}

export interface BookingTableViewProps {
    bookingEntryService: BookingEntryService,
}

export default class BookingTableView extends Component<BookingTableViewProps, BookingTableViewState> {

    constructor(props: Readonly<BookingTableViewProps>) {
        super(props);

        this.state = {
            bookingEntries: [
                this.newBookingEntry()]
        };

        this.loadBookings();
    }

    render(): React.ReactElement {
        return <div>
            <h1>Sworhm UI</h1>
            {this.entries()}
        </div>;
    }

    private newBookingEntry() {
        return this.props.bookingEntryService.createBookingEntry();
    }

    private loadBookings() {
        this.props.bookingEntryService.getAll()
            .then(value =>
                this.setState({
                    bookingEntries: value
                }));
    }

    private entries() {
        return this.state.bookingEntries.map(this.toBookingEntryView);
    }

    private toBookingEntryView = (entry: BookingEntry) => {
        return <BookingEntryView key={entry.id}
                                 onAdd={this.addNewRowAfter}
                                 onRemove={this.removeEntry}
                                 onUpdate={this.updateEntry}
                                 entry={entry}/>;
    };

    private addNewRowAfter = (bookingEntry: BookingEntry) => {
        const entries = [...this.state.bookingEntries];
        const index = entries.indexOf(bookingEntry);
        entries.splice(index + 1, 0, this.newBookingEntry());

        this.setState({
            bookingEntries: entries
        });
    };


    private updateEntry = (updatedEntry: BookingEntry): void => {
        const bookingEntries: BookingEntry[] = [...this.state.bookingEntries];
        bookingEntries[this.entryIndexOf(updatedEntry)] = updatedEntry;
        this.setState({bookingEntries: bookingEntries});

        this.props.bookingEntryService.save(updatedEntry);
        // TODO: marmer 10.06.2019 Handle unsuccessful tries
    };

    private entryIndexOf(updatedEntry: BookingEntry) {
        return this.state.bookingEntries.findIndex(value => value.hasIdOf(updatedEntry));
    }

    private removeEntry = (entryToDelete: BookingEntry) => {
        this.props.bookingEntryService.delete(entryToDelete)
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


