import React, {Component} from 'react';
import './SworhmUi.css';
import BookingDayView from "./ui/BookingDayView";

class SworhmUi extends Component {
    render() {
        return (
            <div className="SwormUi">
                <BookingDayView/>
            </div>
        );
    }
}

export default SworhmUi;
