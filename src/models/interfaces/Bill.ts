import { MenuItem } from './MenuItem';

export interface BillItem extends MenuItem {
    quantity: number;
    total: number;
}

export interface Bill {
    id: string;
    customer: string;
    itemList: BillItem[];
    total: number;
    createAt: Date;
}
