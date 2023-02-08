import {promises as fs} from 'fs'
import { ProductManager } from "../controllers/ProductManager.js";
const productos =await JSON.parse(await fs.readFile(ProductManager("./models/products.json"), 'utf-8'))

export class CartManager{ 

    inTheCart = (id) => {
    // verify if the id is in cart
    const productoExist = productos.some((elemento) => elemento.id === id);
    return productoExist;
  };

 addProduct = (item, cantidad) => {
    const productosB = [...productos];
    //modificate product cart quantity
    if (inTheCart(item.id)) {
      const productRep = productosB.findIndex(
        (elemento) => elemento.id === item.id
      );
      productosB[productRep].cantidad += cantidad;
      productosB[productRep].precioCantidad =
        productosB[productRep].cantidad * productosB[productRep].price;
      setProductos(productosB);
    } else {
      // add newproduct to cart
      const newProduct = {
        ...item,
        cantidad: cantidad,
        precioCantidad: cantidad * item.price,
      };
      productosB.push(newProduct);
      setProductos(productosB);
    }
  };


   deleteCart = () => {
    const cart=[];

  };
   deleteItem = (id) => {
    const newProduct = productos.filter((element) => element.id !== id);
    setProductos(newProduct);
  };
}