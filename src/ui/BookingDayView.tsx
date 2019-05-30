import React, {Component} from 'react';
import BookingTableView from "./BookingTableView";

interface BookingDayViewState {

}

export interface BookingDayViewProps {

}

export default class BookingDayView extends Component<BookingDayViewProps, BookingDayViewState> {

    constructor(props: Readonly<BookingDayViewProps>) {
        super(props);
    }

    render(): React.ReactElement {
        return <div>
            <BookingTableView resourceReference="http://backend.de/api/booking-days/2002-02-01"
                              bookingDay="2002-02-01"/>
        </div>;
    }

}
