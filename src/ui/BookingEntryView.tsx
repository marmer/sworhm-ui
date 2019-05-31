import React from 'react';
import './BookingEntryView.css'
import BookingEntry from "../core/model/BookingEntry";

interface BookingEntryViewState {
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
     * @param bookingEntry of the updated entryl
     */
    onUpdate?(bookingEntry: BookingEntry): void
}

export default class BookingEntryView extends React.Component<BookingEntryViewProps, BookingEntryViewState> {

    render(): React.ReactNode {
        return (
            <div className="container BookingEntryView">
                <div className="row no-gutters">
                    <input type="text" name="start" className="col-1 start" placeholder="09:25"
                           value={this.props.entry.startTime}/>

                    <input type="text" name="duration" className="col-1 duration"
                           placeholder='2:17' value={this.props.entry.duration}/>

                    <textarea rows={1} name="description" className="col description"
                              placeholder="what has been done" value={this.props.entry.description}/>

                    <input type="textarea" name="ticket" className="col-2 ticket" placeholder="TICKET-123"
                           value={this.props.entry.ticket}/>

                    <textarea rows={1} name="notes" className="col notes" placeholder="personal notes"
                              value={this.props.entry.notes}/>

                    <div className="col-1 btn-group actions">
                        <button type="button" className="btn btn-primary" title="add"
                                onClick={this.onAdd}>
                            <i className="fas fa-plus"/>
                        </button>
                        {/*<button type="button" className="btn btn-primary" title="synced">*/}
                        {/*    <i className="fas fa-lock"/>*/}
                        {/*</button>*/}
                        {/**/}
                        <button type="button" className="btn btn-primary" title="synced">
                            <i className="fas fa-lock-open"/>
                        </button>
                        {/*<button type="button" className="btn btn-primary" title="sync">*/}
                        {/*    <i className="fas fa-sync-alt"/>*/}
                        {/*</button>*/}
                        <button type="button" className="btn btn-danger" title="remove" onClick={this.onRemove}>
                            <i className="fas fa-trash-alt"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
            this.props.onUpdate(this.props.entry);
    }
}