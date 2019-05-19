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
            <EntryList bookingEntries={this.state.bookingEntries}/>
        </div>;
    }

}

interface EntryListProps {
    bookingEntries: string[]

}

function EntryList(bookingEntries: EntryListProps) {
    let entries = bookingEntries.bookingEntries.map(entryId => <BookingEntryView key={String(entryId)}
                                                                                 location={entryId}/>);
    return <>
        {entries}
    </>;
}
