import { MenuItem } from './MenuItem';

export interface BillMenuItem extends MenuItem {
    quantity: number;
    total: number;
}

export interface Bill {
    id: string;
    customer: string;
    itemList: BillMenuItem[];
    total: number;
    createAt: Date;
}
