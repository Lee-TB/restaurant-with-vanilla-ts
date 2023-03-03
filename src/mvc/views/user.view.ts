import { User } from '../models/user.model';
// View
export class UserView {
    render(user: User): string {
        return `<div>Name: ${user.name}</div><div>Email: ${user.email}</div>`;
    }
}
