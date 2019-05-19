import React, {Component} from 'react';
import './SworhmUi.css';
import BookingViewTable from "./ui/BookingViewTable";

class SworhmUi extends Component {
    render() {
        return (
            <div className="SwormUi">
                <BookingViewTable/>
            </div>
        );
    }
}

export default SworhmUi;
