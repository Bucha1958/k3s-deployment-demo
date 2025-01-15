import { Request } from '../../../general-service/node_modules/@types/express';


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
    };
    file?: Express.Multer.File;
}

export interface User {
    username: string;
    email: string;
    password: string;
}

export type InventoryStatus = 'In Stock' | 'Out of Stock';