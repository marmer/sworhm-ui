import React, {Component} from 'react';
import BookingEntryView from "./BookingEntryView";

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

        const DONE = 4;
        const OK = 200;

        this.state = {
            bookingEntries: [{id: "something", description:"should not be visible"}, {id: "else", description:"bla"}]
        }


        // xhr.addEventListener("load", listener);
        xhr.open("GET", "http://backend.de/api/bookings/2002-02-01/entries");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === DONE && xhr.status === OK) {
                let fancyResponse = JSON.parse(xhr.responseText) as FancyResponse;
                const embedded = fancyResponse._embedded;

                let bookingEntries = embedded.map((source) => {
                    return {id: source._links.self.href, ...source};
                });

                this.setState({
                    bookingEntries: bookingEntries
                })
            }
        };
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


