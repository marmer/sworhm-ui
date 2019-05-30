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
                props.bookingProviderService.newBookingEntry()]
        };

        this.loadBookings();
    }

    render(): React.ReactElement {
        return <div>
            <h1>Sworhm UI</h1>
            {this.entries()}
        </div>;
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

    private addNewRow = (id: string) => {
        this.setState({
            bookingEntries: [...this.state.bookingEntries, {id: id}]
        });
    };

    private updateEntry = (id: string) => {
        alert("Update: " + id)
    };

    private removeEntry = (id: string) => {
        alert("Remove: " + id)
    }
}


