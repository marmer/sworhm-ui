import React, {Component} from 'react';
import BookingTableView from "./BookingTableView";
import RestBookingEntryService from "../rest/RestBookingEntryService";

interface BookingDayViewState {

}

export interface BookingDayViewProps {

}

export default class BookingDayView extends Component<BookingDayViewProps, BookingDayViewState> {
    render(): React.ReactElement {
        return <div>
            <BookingTableView
                bookingEntryService={new RestBookingEntryService("2002-02-01")}/>
        </div>;
    }

}
