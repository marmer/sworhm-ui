import React from 'react';

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
            <>
                <h6>Entry of {this.props.location}</h6>
                <tr>
                    <td>
                        <input type="text" name="start" placeholder="e.g. '09:25'"/>
                    </td>
                    <td>
                        <input type="textarea" name="duration" placeholder='e.g. 01:15, 1h15'/>
                    </td>
                    <td>
                        <textarea rows={1} placeholder="What has been done"/>
                    </td>
                    <td>
                        <input type="textarea" placeholder="TICKET-123"/>
                    </td>
                    <td>
                        <textarea rows={1} placeholder="personal notes"/>
                    </td>
                    <td>
                        <div className="btn-group">
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
                    </td>
                </tr>
            </>
        );
    }
}