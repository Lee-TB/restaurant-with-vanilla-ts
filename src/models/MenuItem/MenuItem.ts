export class MenuItem {
    private id: string;
    private name: string;
    private description: string;
    private image: string;
    private price: number;
    private createAt: Date;

    constructor(
        id: string,
        name: string,
        description: string,
        image: string,
        price: number,
        createAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.createAt = createAt;
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
}
