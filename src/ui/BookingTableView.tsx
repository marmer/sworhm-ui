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
        return this.state.bookingEntries.map(entry =>
            <BookingEntryView key={entry.id}
                              onAdd={this.addNewRow}
                              onRemove={this.removeEntry}
                              onUpdate={this.updateEntry}
                              entry={entry}/>);
    }

    private addNewRow = (bookingEntry: BookingEntry) => {
        this.setState({
            bookingEntries: [...this.state.bookingEntries, this.newBookingEntry()]
        });
    };

    private updateEntry = (bookingEntry: BookingEntry) => {
        alert("Update: " + bookingEntry)
    };

    private removeEntry = (entryToDelete: BookingEntry) => {
        this.props.bookingProviderService.delete(entryToDelete)
            .then((deletedEntry) => {
                const bookingEntries = [...this.state.bookingEntries];
                bookingEntries.splice(bookingEntries.indexOf(deletedEntry), 1);
                this.setState({bookingEntries: bookingEntries});
            })


    }
}


