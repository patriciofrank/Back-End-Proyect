import { promises as fs } from 'fs'


export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {

            const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return cart

        } catch (error) {
            return error
        }

    }

    async addProduct(item, cantidad) {
        const cartP = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const productosB = [...cartP];

        const newProduct = {
            ...item,
            cantidad: cantidad,
            id: productosB.length + 1
        };
        productosB.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(productosB, null, 2));
        return "product add succesfuly"

    };


    async deleteCart() {
        const cartDelete = [];
        await fs.writeFile(this.path, JSON.stringify(cartDelete, null, 2));
        return "cart deleted"
    };
    async deleteItem(id) {
        try {
            const cartP = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if (cartP.some(prod => prod.id === parseInt(id))) {
                const cartFilter = cartP.filter(prod => prod.id !== parseInt(id))
                await fs.writeFile(this.path, JSON.stringify(cartFilter, null, 2))
                return "Product deleted"
            } else {
                return "Product not found"
            }
        } catch (error) {
            return error
        }
    };
}