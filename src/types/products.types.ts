import { Request } from 'express';

export interface Inventory {
    count: number;
    status: 'In Stock' | 'Out of Stock' | 'Discontinued';
}

export interface ProductData {
    name: string;
    price: number;
    categories: string[];
    initialInventory: Inventory;
    images: String[];
}

export interface inventoryUpdateRequest extends Request {
    params: {
        productId: string;
    };
    body: {
        quantity: number;
    }
}

export type InventoryStatus = 'In Stock' | 'Out of Stock';