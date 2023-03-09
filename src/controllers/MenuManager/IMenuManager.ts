import { MenuType } from '../../models/enums/MenuType';

export interface IMenuManager {
    createMenuItem(): void;
    updateMenuItem(id: number): void;
    deleteMenuItem(id: number): void;
    renderMenu(type: MenuType): Promise<void>;
}
