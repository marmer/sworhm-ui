import React from 'react';
import './BookingEntryView.css'
import BookingEntry from "../core/model/BookingEntry";

interface BookingEntryViewState {
    startTime?: string;
    duration?: string;
    description?: string;
    ticket?: string;
    notes?: string;
}

export interface BookingEntryViewProps {
    entry: BookingEntry
    /**
     * Called if an add action was performed
     * @param bookingEntry where to add an entry
     */
    onAdd?(bookingEntry: BookingEntry): void

    /**
     * Called if a remove action has been performed
     * @param bookingEntry where to add an entry
     */
    onRemove?(bookingEntry: BookingEntry): void

    /**
     * Called if an update action has been performed
     * @param updatedEntry of the updated entry
     * @param oldEntry of the updated entry
     */
    onUpdate?(updatedEntry: BookingEntry, oldEntry: BookingEntry): void
}

export default class BookingEntryView extends React.Component<BookingEntryViewProps, BookingEntryViewState> {


    constructor(props: Readonly<BookingEntryViewProps>) {
        super(props);
        this.state = {...props.entry};
    }

    render(): React.ReactNode {
        return <div className="container BookingEntryView">
            <div className="row no-gutters">
                <input type="text" name="start" className="col-1 start" placeholder="09:25"
                       value={this.state.startTime} onChange={this.onStartTimeChange}/>

                <input type="text" name="duration" className="col-1 duration"
                       placeholder='2:17' value={this.state.duration}
                       onChange={this.onDurationChange}/>

                <textarea rows={1} name="description" className="col description"
                          placeholder="what has been done" value={this.state.description}
                          onChange={this.onDescriptionChange}/>

                <input type="text" name="ticket" className="col-2 ticket" placeholder="TICKET-123"
                       value={this.state.ticket} onChange={this.onTicketChange}/>

                <textarea rows={1} name="notes" className="col notes" placeholder="personal notes"
                          value={this.state.notes} onChange={this.onNotesChange}/>

                <div className="col-1 btn-group actions">
                    <button type="button" className="btn btn-primary" title="save"
                            onClick={this.onUpdate}>
                        <i className="fas fa-save"/>
                    </button>
                    <button type="button" className="btn btn-primary" title="add"
                            onClick={this.onAdd}>
                        <i className="fas fa-plus"/>
                    </button>
                    {/*<button type="button" className="btn btn-primary" title="synced">*/}
                    {/*    <i className="fas fa-lock"/>*/}
                    {/*</button>*/}
                    {/**/}
                    {/*<button type="button" className="btn btn-primary" title="synced">*/}
                    {/*    <i className="fas fa-lock-open"/>*/}
                    {/*</button>*/}
                    {/*<button type="button" className="btn btn-primary" title="sync">*/}
                    {/*    <i className="fas fa-sync-alt"/>*/}
                    {/*</button>*/}
                    <button type="button" className="btn btn-danger" title="remove" onClick={this.onRemove}>
                        <i className="fas fa-trash-alt"/>
                    </button>
                </div>
            </div>
        </div>;
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