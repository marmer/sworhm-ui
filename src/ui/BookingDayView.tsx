import React, {Component} from 'react';
import BookingTableView from "./BookingTableView";
import CoreServiceFactory from "../core/service/CoreServiceFactory";

interface BookingDayViewState {

}

export interface BookingDayViewProps {
    coreServicesFactory: CoreServiceFactory
}

export default class BookingDayView extends Component<BookingDayViewProps, BookingDayViewState> {
    render(): React.ReactElement {
        return <div>
            <h1>Sworhm UI</h1>
            <BookingTableView coreServicesFactory={this.props.coreServicesFactory}
                              day={"2002-02-01"}/>
        </div>;
    }

}
