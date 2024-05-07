export interface Inventory {
    count: number;
    status: 'In Stock' | 'Out of Stock' | 'Discontinued';
}

export interface ProductData {
    name: string;
    price: number;
    categories: string[];
    inventory: Inventory;
}
