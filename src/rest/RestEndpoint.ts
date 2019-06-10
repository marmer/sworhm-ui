export enum HttpStatus {
    OK = 200,
    NO_CONTENT = 204,
}

export default class RestEndpoint<T> {

    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public performGet<B>(expectedStatus = HttpStatus): Promise<T> {
        return this.perform("GET", expectedStatus.OK);
    }

    public performDelete(expectedStatus = HttpStatus.NO_CONTENT): Promise<T> {
        return this.perform("DELETE", expectedStatus)
    }

    public performPut<B>(body: B, expectedStatus = HttpStatus.OK): Promise<T> {
        return this.perform("PUT", expectedStatus, body);
    }

    private perform<B>(method: string, expectedStatus: HttpStatus, body?: B): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", () => {
                if (xhr.status === expectedStatus) {
                    try {
                        const json = JSON.parse(xhr.responseText);
                        resolve(json)
                    } catch (e) {
                        resolve();
                    }
                } else {
                    reject();
                }
            });
            xhr.open(method, this.url, true);
            xhr.setRequestHeader('Accept', 'application/JSON');
            xhr.send(body !== null || body !== undefined ? JSON.stringify(body) : null);
        });
    }
}
