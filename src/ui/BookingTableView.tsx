import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";
import BookingEntry from "../core/model/BookingEntry";
import BookingEntryService from "../core/service/BookingEntryService";

interface BookingTableViewState {
    bookingEntries: BookingEntry[];
}

export interface BookingTableViewProps {
    bookingProviderService: BookingEntryService,
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
        return this.props.bookingProviderService.newBookingEntry();
    }

    private loadBookings() {
        this.props.bookingProviderService.getBookingEntries()
            .then(value =>
                this.setState({
                    bookingEntries: value
                }));
    }

    private entries() {
        // TODO: marmer 08.06.2019 get out why map is not a function anymore
        return this.state.bookingEntries.map(this.toBookingEntryView);
    }

    private toBookingEntryView = (entry: BookingEntry) => {
        return <BookingEntryView key={entry.id}
                                 onAdd={this.addNewRowAfter}
                                 onRemove={this.removeEntry}
                                 onUpdate={this.updateEntry}
                                 entry={entry}/>;
    }

    private addNewRowAfter = (bookingEntry: BookingEntry) => {
        const entries = [...this.state.bookingEntries];
        const index = entries.indexOf(bookingEntry);
        entries.splice(index + 1, 0, this.newBookingEntry());

        this.setState({
            bookingEntries: entries
        });
    };


    private updateEntry = (updatedEntry: BookingEntry): void => {
        const bookingEntries: BookingEntry[] = {...this.state.bookingEntries};
        bookingEntries[this.entryIndexOf(updatedEntry)] = updatedEntry
        this.setState({bookingEntries: bookingEntries});

        // TODO: marmer 08.06.2019 Perform the real update

    };

    private entryIndexOf(updatedEntry: BookingEntry) {
        return this.state.bookingEntries.findIndex(value => value.hasIdOf(updatedEntry));
    }

    private removeEntry = (entryToDelete: BookingEntry) => {
        this.props.bookingProviderService.delete(entryToDelete)
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


