export interface MenuItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    menuType: 'foodmenu' | 'drinkmenu';
    categories: string[];
    createAt: Date;
}
