export interface IMenuItem {
    getId(): string;
    setId(id: string): void;
    getName(): string;
    setName(name: string): void;
    getDescription(): string;
    setDescription(description: string): void;
    getImage(): string;
    setImage(image: string): void;
    getPrice(): number;
    setPrice(price: number): void;
    getCreateAt(): Date;
    setCreateAt(createAt: Date): void;
}
