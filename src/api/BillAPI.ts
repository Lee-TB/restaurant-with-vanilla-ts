import { MenuItem } from '../models/interfaces/MenuItem';

export const MOCK_URL = `https://640e93b94ed25579dc371e90.mockapi.io/`;

export class BillAPI {
    private url: string;

    constructor(endpoint: 'bill') {
        this.url = MOCK_URL + endpoint + '/';
    }

    public setEndpoint(endpoint: 'bill'): void {
        this.url = MOCK_URL + endpoint + '/';
    }

    async post(data: MenuItem): Promise<Response> {
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

    async getAll(): Promise<Response> {
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

    async update(id: number, data: MenuItem) {
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
