import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";

interface BookingTableViewState {
    bookingEntries: string[]

}

export interface BookingViewTableProps {

}

export default class BookingViewTable extends Component<BookingViewTableProps, BookingTableViewState> {

    constructor(props: Readonly<BookingViewTableProps>) {
        super(props);
        this.state = {
            bookingEntries: [
                "http://some.server/booking/42/entry/21", "http://some.server/booking/42/entry/42",
            ]
        }

        this.addNewRow = this.addNewRow.bind(this);
        this.updateEntry = this.updateEntry.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
    }

    render(): React.ReactElement {
        return <div>
            <h1>Sworhm UI</h1>
            {this.entries()}
        </div>;
    }

    private entries() {
        return this.state.bookingEntries.map(entryId =>
            <BookingEntryView key={entryId}
                              location={entryId}
                              onAdd={this.addNewRow}
                              onRemove={this.removeEntry}
                              onUpdate={this.updateEntry}/>);
    }

    private addNewRow(location: string) {
        this.setState({
            bookingEntries: [...this.state.bookingEntries, "http://some.server/booking/42/entry/" + Math.round(Math.random()*5000)]
        });
    }


    private updateEntry(location: string) {
        alert("Update: " + location)
    }

    private removeEntry(location: string) {
        alert("Remove: " + location)
    }
}


