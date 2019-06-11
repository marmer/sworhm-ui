import React, {Component} from 'react';
import './SworhmUi.css';
import BookingDayView from "./ui/BookingDayView";
import RestCoreServiceFactory from "./RestCoreServiceFactory";


class SworhmUi extends Component {
    render() {
        return (
            <div className="SwormUi">
                <BookingDayView coreServicesFactory={new RestCoreServiceFactory()}/>
            </div>
        );
    }
}

export default SworhmUi;
