import React from 'react';
import './BookingEntryView.css'

interface BookingEntryViewState {
}

export interface BookingEntryViewProps {
    location: string
}

export default class BookingEntryView extends React.Component<BookingEntryViewProps, BookingEntryViewState> {
    constructor(props: BookingEntryViewProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className="container">
                <div className="row no-gutters">
                    <input type="text" name="start" className="col start" placeholder="e.g. '09:25'"/>

                    <input type="text" name="duration" className="col duration"
                           placeholder='e.g. 01:15, 1h15'/>

                    <textarea rows={1} name="description" className="col description"
                              placeholder="What has been done"/>

                    <input type="textarea" name="ticket" className="col ticket" placeholder="TICKET-123"/>


                    <textarea rows={1} name="notes" className="col notes" placeholder="personal notes"/>

                    <div className="col btn-group actions">
                        <button type="button" className="btn btn-primary" title="add">
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
                        <button type="button" className="btn btn-danger" title="remove">
                            <i className="fas fa-trash-alt"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}