import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";
import * as uuid from 'uuidv4';

interface FancyResponse {
    _links: {
        self: {
            href: string
        },
        last: {
            href: string
        },
        next: {
            href: string
        }
    },
    day: string,
    _embedded: {
        _links: {
            self: {
                href: string
            }
        },
        startTime: string,
        duration: string,
        description: string,
        ticket: string,
        notes: string
    }[]
}

interface BookingTableViewState {
    bookingEntries: {
        id: string,
        startTime?: string,
        duration?: string,
        description?: string,
        ticket?: string,
        notes?: string
    }[];
}

export interface BookingTableViewProps {
    resourceReference: string;
}

export default class BookingTableView extends Component<BookingTableViewProps, BookingTableViewState> {

    constructor(props: Readonly<BookingTableViewProps>) {
        super(props);

        // TODO: marmer 24.05.2019 Extract this spike to seperate "service"
        const xhr = new XMLHttpRequest();



        this.state = {
            bookingEntries: [
                {id:uuid(),
                description:uuid()}
            ]
        }

        xhr.addEventListener("load", (event) => {
            if (xhr.status === 200) {
                let fancyResponse = JSON.parse(xhr.responseText) as FancyResponse;
                const embedded = fancyResponse._embedded;

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
    }

    private updateEntry = (id: string) => {
        alert("Update: " + id)
    }

    private removeEntry = (id: string) => {
        alert("Remove: " + id)
    }
}


