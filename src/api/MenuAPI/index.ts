export const MOCK_URL = `https://62c4071b7d83a75e39edba50.mockapi.io/`;

export class MenuAPI {
    private url = MOCK_URL + 'menu';

    async post(data: any) {
        const res = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return new Promise((resolve) => {
            resolve(res);
        });
    }

    async getAll() {
        const res = await fetch(this.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return new Promise((resolve) => {
            resolve(res);
        });
    }
}
