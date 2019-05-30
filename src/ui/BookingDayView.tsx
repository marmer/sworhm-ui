import React, {Component} from 'react';
import BookingTableView from "./BookingTableView";
import RestBookingEntryProviderService from "../rest/RestBookingEntryProviderService";

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
            <BookingTableView
                bookingProviderService={new RestBookingEntryProviderService("http://backend.de/api/booking-days/2002-02-01")}
                resourceReference="http://backend.de/api/booking-days/2002-02-01"
                bookingDay="2002-02-01"/>
        </div>;
    }

}
