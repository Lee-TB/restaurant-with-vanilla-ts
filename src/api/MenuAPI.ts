export const MOCK_URL = `https://62c4071b7d83a75e39edba50.mockapi.io/`;

export class MenuAPI {
    private url: string;
    constructor(endpoint: 'menu') {
        this.url = MOCK_URL + endpoint + '/';
    }

    async post(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(this.url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    async get(id: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(this.url + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    async update(id: number, data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(this.url + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    async delete(id: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(this.url + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }
}
