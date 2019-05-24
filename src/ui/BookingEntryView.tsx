import React from 'react';
import './BookingEntryView.css'

interface BookingEntryViewState {
}

export interface BookingEntryViewProps {
    entry: {
        id: string,
        startTime?: string,
        duration?: string,
        description?: string,
        ticket?: string,
        notes?: string
    }

    /**
     * Called if an add action was performed
     * @param location where to add an entry
     */
    onAdd?(location: string): void

    /**
     * Called if a remove action has been performed
     * @param location where to add an entry
     */
    onRemove?(location: string): void

    /**
     * Called if an update action has been performed
     * @param location of the updated entryl
     */
    onUpdate?(location: string): void
}

export default class BookingEntryView extends React.Component<BookingEntryViewProps, BookingEntryViewState> {

    render(): React.ReactNode {
        return (
            <div className="container BookingEntryView">
                <div className="row no-gutters">
                    <input type="text" name="start" className="col start" placeholder="e.g. '09:25'" value={this.props.entry.startTime}/>

                    <input type="text" name="duration" className="col duration"
                           placeholder='e.g. 01:15, 1h15' value={this.props.entry.duration}/>

                    <textarea rows={1} name="description" className="col description"
                              placeholder="What has been done" value={this.props.entry.description}/>

                    <input type="textarea" name="ticket" className="col ticket" placeholder="TICKET-123" value={this.props.entry.ticket}/>


                    <textarea rows={1} name="notes" className="col notes" placeholder="personal notes" value={this.props.entry.notes}/>

                    <div className="col btn-group actions">
                        <button type="button" className="btn btn-primary" title="add"
                                onClick={this.onAdd}>
                            <i className="fas fa-plus"/>
                        </button>
                        <button type="button" className="btn btn-primary" title="synced">
                            <i className="fas fa-lock"/>
                        </button>

                        <button type="button" className="btn btn-primary" title="synced">
                            <i className="fas fa-lock-open"/>
                        </button>
                        <button type="button" className="btn btn-primary" title="sync">
                            <i className="fas fa-sync-alt"/>
                        </button>
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
            this.props.onAdd(this.props.entry.id);
    }

    private onRemove = () => {
        if (this.props.onRemove)
            this.props.onRemove(this.props.entry.id);
    }

    private onUpdate = () => {
        if (this.props.onUpdate)
            this.props.onUpdate(this.props.entry.id);
    }
}