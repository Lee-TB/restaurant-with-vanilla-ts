import { MOCK_URL } from '../../constants';

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
            resolve(res.json());
        });
    }
}
