import React, {Component} from 'react';
import './SworhmUi.css';
import BookingTableView from "./ui/BookingTableView";

class SworhmUi extends Component {
    render() {
        return (
            <div className="SwormUi">
                <BookingTableView resourceReference="http://backend.de/api/bookings/2002-02-01/entries"/>
            </div>
        );
    }
}

export default SworhmUi;
