import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";

interface BookingTableViewState {
    bookingEntries: {
        id:string,
        startTime?: string,
        duration?: string,
        description?: string,
        ticket?: string,
        notes?: string
    }[];

}

export interface BookingViewTableProps {
    resourceReference: string;
}

export default class BookingViewTable extends Component<BookingViewTableProps, BookingTableViewState> {

    constructor(props: Readonly<BookingViewTableProps>) {
        super(props);
        this.state = {
            bookingEntries: [{id:"bla1"},{id:"bla2"}]
        }
    }

    render(): React.ReactElement {
        return <div>
            <h1>Sworhm UI</h1>
            {this.entries()}
        </div>;
    }

    private entries() {
        return this.state.bookingEntries.map(entry =>
            <BookingEntryView key={entry.id}
                              onAdd={this.addNewRow}
                              onRemove={this.removeEntry}
                              onUpdate={this.updateEntry} entry={entry}/>);
    }

    private addNewRow = (id: string) => {
        this.setState({
            bookingEntries: [...this.state.bookingEntries, {id:id}]
        });
    }

    private updateEntry = (id: string) => {
        alert("Update: " + id)
    }

    private removeEntry =(id: string) => {
        alert("Remove: " + id)
    }
}


