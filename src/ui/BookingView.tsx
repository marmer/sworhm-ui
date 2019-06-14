import React from 'react';
import './BookingView.css'
import Booking from "../core/model/Booking";

interface BookingViewState {
    startTime?: string;
    duration?: string;
    description?: string;
    ticket?: string;
    notes?: string;
}

export interface BookingViewProps {
    entry: Booking
    /**
     * Called if an add action was performed
     * @param booking where to add an entry
     */
    onAdd?(booking: Booking): void

    /**
     * Called if a remove action has been performed
     * @param booking where to add an entry
     */
    onRemove?(booking: Booking): void

    /**
     * Called if an update action has been performed
     * @param updatedBooking of the updated entry
     * @param oldBooking of the updated entry
     */
    onUpdate?(updatedBooking: Booking, oldBooking: Booking): void
}

export default class BookingView extends React.Component<BookingViewProps, BookingViewState> {


    constructor(props: Readonly<BookingViewProps>) {
        super(props);
        this.state = {...props.entry};
    }

    render(): React.ReactNode {
        return <tr className="BookingView">
            <td>
                <input type="text" className="bookingStartTime text-center" placeholder="09:25"
                       value={this.state.startTime} onChange={this.onStartTimeChange}/>
            </td>
            <td>
                <input type="text" className="bookingDuration  text-center"
                       placeholder='2:17' value={this.state.duration}
                       onChange={this.onDurationChange}/>
            </td>
            <td>
                <textarea rows={1} className="bookingDescription"
                          placeholder="what has been done" value={this.state.description}
                          onChange={this.onDescriptionChange}/>
            </td>
            <td>
                <input type="text" className="bookingTicket text-center" placeholder="TICKET-123"
                       value={this.state.ticket} onChange={this.onTicketChange}/>
            </td>
            <td>
                <textarea rows={1} className="bookingNotes" placeholder="personal notes"
                          value={this.state.notes} onChange={this.onNotesChange}/>
            </td>
            <td>
                <span className="btn-group actions">
                    <button type="button" className="btn btn-primary" title="save"
                            onClick={this.onUpdate}>
                        <i className="fas fa-save"/>
                    </button>
                    <button type="button" className="btn btn-primary" title="add"
                            onClick={this.onAdd}>
                        <i className="fas fa-plus"/>
                    </button>
                    <button type="button" className="btn btn-danger" title="remove" onClick={this.onRemove}>
                        <i className="fas fa-trash-alt"/>
                    </button>
                </span>
            </td>
        </tr>;
    }

    private onTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({ticket: e.target.value});
    };

    private onStartTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({startTime: e.target.value});
    };

    private onDurationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({duration: e.target.value});
    };

    private onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({description: e.target.value});
    };

    private onNotesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({notes: e.target.value});
    };

    private onAdd = () => {
        if (this.props.onAdd)
            this.props.onAdd(this.props.entry);
    };

    private onRemove = () => {
        if (this.props.onRemove)
            this.props.onRemove(this.props.entry);
    };

    private onUpdate = () => {
        if (this.props.onUpdate)
            this.props.onUpdate({...this.props.entry, ...this.state}, this.props.entry);
    }
}