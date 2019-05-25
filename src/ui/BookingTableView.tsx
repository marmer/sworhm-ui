import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";
import * as uuid from 'uuidv4';
import BookingEntry from "../core/model/BookingEntry";
import BookingDayResponseDto from "../backend/model/BookingDayResponseDto";

interface BookingTableViewState {
    bookingEntries: BookingEntry[];
}

export interface BookingTableViewProps {
    resourceReference: string;
}

export default class BookingTableView extends Component<BookingTableViewProps, BookingTableViewState> {

    constructor(props: Readonly<BookingTableViewProps>) {
        super(props);

        // TODO: marmer 24.05.2019 Extract this spike to seperate "service"
        this.state = {
            bookingEntries: [
                {
                    id: uuid(),
                    description: uuid()
                }
            ]
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                const responseDto = JSON.parse(xhr.responseText) as BookingDayResponseDto;
                const embedded = responseDto._embedded;

                let bookingEntries = embedded.map((source) => {
                    return {id: source._links.self.href, ...source};
                });

                this.setState({
                    bookingEntries: bookingEntries
                })
            }
        });
        xhr.open("GET", "http://backend.de/api/bookings/2002-02-01/entries");
        xhr.send();
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
            bookingEntries: [...this.state.bookingEntries, {id: id}]
        });
    };

    private updateEntry = (id: string) => {
        alert("Update: " + id)
    };

    private removeEntry = (id: string) => {
        alert("Remove: " + id)
    }
}


