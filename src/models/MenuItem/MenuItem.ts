export interface MenuItemProps {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    categories: string[];
}
export class MenuItem {
    private id: string;
    private name: string;
    private description: string;
    private image: string;
    private price: number;
    private categories: string[];
    private createAt: Date;

    constructor(props: MenuItemProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.image = props.image;
        this.price = props.price;
        this.categories = props.categories?.slice();
        this.createAt = new Date();
    }

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    getImage(): string {
        return this.image;
    }

    setImage(): void {
        this.image = this.image;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getCreateAt(): Date {
        return this.createAt;
    }

    setCreateAt(createAt: Date) {
        this.createAt = createAt;
    }

    setCategories(categories: string[]): void {
        this.categories = categories.slice();
    }

    getCategories(): string[] {
        return this.categories;
    }
}
