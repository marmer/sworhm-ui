import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";

interface BookingTableViewState {

}

export interface BookingViewTableProps {

}

export default class BookingViewTable extends Component<BookingViewTableProps, BookingTableViewState> {
    render(): React.ReactElement {
        return <div>
            <BookingEntryView/>
        </div>;
    }

}
