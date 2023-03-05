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
}
