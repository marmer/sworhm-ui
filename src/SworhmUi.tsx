import React, {Component} from 'react';
import './SworhmUi.css';
import BookingTableView from "./ui/BookingTableView";

class SworhmUi extends Component {
    render() {
        return (
            <div className="SwormUi">
                <BookingTableView resourceReference="http://backend.de/api/booking-days/2002-02-01/entries"
                                  bookingDay="2002-02-01"/>
            </div>
        );
    }
}

export default SworhmUi;
