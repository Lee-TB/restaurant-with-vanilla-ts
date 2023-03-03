import { User } from '../models/user.model';
import { UserView } from '../views/user.view';

// Controller
export class UserController {
    private model: User;
    private view: UserView;

    constructor(model: User, view: UserView) {
        this.model = model;
        this.view = view;
    }

    setUserName(name: string) {
        this.model.name = name;
        this.updateView();
    }

    setUserEmail(email: string) {
        this.model.email = email;
        this.updateView();
    }

    private updateView() {
        const userHtml = this.view.render(this.model);
        // update the HTML DOM with userHtml
    }
}
