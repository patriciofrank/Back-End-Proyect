import {promises as fs} from 'fs'


export class CartManager{ 
    constructor(path) {
        this.path = path;
    }

  async  inTheCart (id) {
    // verify if the id is in cart
    const cartP = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    const productoExist = cartP.some((elemento) => elemento.id === id);
    return productoExist;
  };

 async addProduct (item, cantidad)  {
    const cartP = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    const productosB = [...cartP];
    //modificate product cart quantity
    if (inTheCart(item.id)) {
      const productRep = productosB.findIndex(
        (elemento) => elemento.id === item.id
      );
      productosB[productRep].cantidad += cantidad;
    } else {
      // add newproduct to cart
      const newProduct = {
        ...item,
        cantidad: cantidad,
      };
      productosB.push(newProduct);
      await fs.writeFile(this.path, JSON.stringify(cartP, null, 2));
      return "product add succesfuly"
    }
  };


   async deleteCart () {
    const cartP = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    cartP=[];
    await fs.writeFile(this.path, JSON.stringify(cartP, null, 2));
    return "cart deleted"
  };
  async deleteItem (id)  {
    try {
        const cartP = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (cartP.some(prod => prod.id === parseInt(id))) {
            const cartFilter = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(cartFilter,null,2))
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
    } catch (error) {
        return error
    }
  };
}