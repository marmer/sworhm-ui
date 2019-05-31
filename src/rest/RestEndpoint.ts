enum HttpStatus {
    OK = 200,
}

export default class RestEndpoint<T> {

    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public performGet<B>(): Promise<T> {
        return this.perform("GET");
    }

    private perform<B>(method: string, body?: B): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", () => {
                if (xhr.status === HttpStatus.OK) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        reject();
                    }
                } else {
                    reject();
                }
            });
            xhr.open(method, this.url, true);
            xhr.setRequestHeader('Accept', 'application/JSON');
            xhr.send(body ? JSON.stringify(body) : null);
        });
    }
}
