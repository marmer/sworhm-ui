import React, {Component} from 'react';
import './SworhmUi.css';
import BookingDayView from "./ui/BookingDayView";
import RestCoreServiceFactory from "./RestCoreServiceFactory";
import moment from "moment";


export default class SworhmUi extends Component {
    render() {
        const now = new Date();
        return (
            <div className="SwormUi">
                <h1>Sworhm UI</h1>
                <BookingDayView
                    day={this.toIsoDate(now)}
                    coreServicesFactory={new RestCoreServiceFactory()}/>
            </div>
        );
    }

    private toIsoDate = (now: Date) => {
        return moment(now).format('YYYY-MM-DD');
    }
}
