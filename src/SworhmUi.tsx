import React, {Component} from 'react';
import './SworhmUi.css';
import BookingViewTable from "./ui/BookingViewTable";

class SworhmUi extends Component {
    render() {
        return (
            <div className="SwormUi">
                <BookingViewTable resourceReference="http://backend.de/api/bookings/2002-02-01/entries"/>
            </div>
        );
    }
}

export default SworhmUi;
