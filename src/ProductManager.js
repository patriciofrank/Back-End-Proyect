const fs = require("fs/promises");

class ProductManager {
    constructor(path) {
        this.path = path;
    }

   
    async addProduct(producto) {
        try {  
                const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
                producto.id =prods.length +1
                prods.push(producto)
                await fs.writeFile(this.path, JSON.stringify(prods, null, 2))
                return "Producto creado"
        } catch (error) {
            return error
        }
    }

    async getProducts() {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return prods
        } catch (error) {
            return error
        }

    }

    async getProductById(id) {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if (prods.some(prod => prod.id === parseInt(id))) {
                return prods.find(prod => prod.id === parseInt(id))
            } else {
                return "Producto no encontrado"
            }
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if (prods.some(prod => prod.id === parseInt(id))) {
                let index = prods.findIndex(prod => prod.id === parseInt(id))
                prods[index].title = title
                prods[index].description = description
                prods[index].price = price
                prods[index].thumbnail = thumbnail
                prods[index].code = code
                prods[index].stock = stock
                await fs.writeFile(this.path, JSON.stringify(prods, null, 2))
                return "Producto actualizado"
            } else {
                return "Producto no encontrado"
            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if (prods.some(prod => prod.id === parseInt(id))) {
                const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
                await fs.writeFile(this.path, JSON.stringify(prodsFiltrados,null,2))
                return "Producto eliminado"
            } else {
                return "Producto no encontrado"
            }
        } catch (error) {
            return error
        }
    }

}
module.exports = ProductManager