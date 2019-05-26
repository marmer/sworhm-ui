import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";
import BookingEntry from "../core/model/BookingEntry";
import RestBookingProviderService from "../rest/RestBookingProviderService";
import BookingProviderService from "../core/service/BookingProviderService";

interface BookingTableViewState {
    bookingEntries: BookingEntry[];
}

export interface BookingTableViewProps {
    resourceReference: string;
    bookingDay: string;
}

export default class BookingTableView extends Component<BookingTableViewProps, BookingTableViewState> {
    // TODO: marmer 26.05.2019 instance should come from somewhere else
    private bookingProviderService: BookingProviderService = new RestBookingProviderService();

    constructor(props: Readonly<BookingTableViewProps>) {
        super(props);

        this.state = {
            bookingEntries: [
                {
                    // TODO: marmer 26.05.2019 what about a clean init? ;)
                    id: "blabla"
                }
            ]
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
        this.bookingProviderService.getBookingEntriesByDate(this.props.bookingDay)
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
                              onUpdate={this.updateEntry} entry={entry}/>);
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


