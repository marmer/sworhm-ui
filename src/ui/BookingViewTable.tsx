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
    }

    render(): React.ReactElement {
        return <div>
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
        alert("Add: " + location)
    }


    private updateEntry(location: string) {
        alert("Update: " + location)
    }

    private removeEntry(location: string) {
        alert("Remove: " + location)
    }
}


