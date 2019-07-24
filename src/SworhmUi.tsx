import React, {Component} from 'react';
import './SworhmUi.css';
import BookingDayView from "./ui/BookingDayView";
import DefaultCoreServiceFactory from "./DefaultCoreServiceFactory";
import moment from "moment";
import CoreServiceFactory from "./core/service/CoreServiceFactory";
import {TimeService} from "./core/service/TimeService";


interface SworhmUiState {
    day: Date
}

export interface SworhmUiProps {

}

export default class SworhmUi extends Component<SworhmUiProps, SworhmUiState> {
    private readonly coreServiceFactory: CoreServiceFactory = new DefaultCoreServiceFactory();
    private readonly timeService: TimeService = this.coreServiceFactory.getTimeService();

    constructor(props: SworhmUiProps, context: any) {
        super(props, context);
        this.state = {
            day: this.timeService.getNow()
        }
    }

    render() {
        return (
            <div className="SwormUi">
                <h1>Sworhm UI</h1>
                <DayChooser initialDate={this.state.day} onChange={this.changeDate}/>
                <BookingDayView
                    day={toIsoDate(this.state.day)}
                    coreServicesFactory={this.coreServiceFactory}/>
            </div>
        );
    }

    private changeDate = (newDate: Date) => this.setState({day: newDate});

}
const toIsoDate = (now: Date) => {
    return moment(now).format('YYYY-MM-DD');
};

function DayChooser(props: {
    initialDate: Date
    onChange: (newDate: Date) => void
}) {
    const goToNextDay = () => props.onChange(moment(props.initialDate).add(1, "day").toDate());
    const goToPreveousDay = () => props.onChange(moment(props.initialDate).add(-1, "day").toDate());
    return <div className="container">
        <div className="row">
            <button className="col" onClick={goToPreveousDay}>-</button>
            <div className="col">{toIsoDate(props.initialDate)}</div>
            <button className="col" onClick={goToNextDay}>+</button>
        </div>
    </div>;
}