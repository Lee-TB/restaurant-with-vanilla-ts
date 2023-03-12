import { MenuItem } from './MenuItem';

interface BillItem extends MenuItem {
    quantity: number;
}

export interface Bill {
    id: string;
    customer: string;
    itemList: BillItem[];
    total: number;
    createAt: Date;
}
