const fs = require("fs/promises");
const { existsSync } = require("fs");

class ProductManager {

  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    if (existsSync(this.path)) {
      const products = await fs.readFile(this.path, "utf-8");
      const listProducts = JSON.parse(products);
      return listProducts;
    } else {
      return [];
    }
  }

  async addProduct(title, description, price, thumbnail, stock, code) {
    // const to verify if all the product file are completed
    const infProd = title + description + price + thumbnail + stock + code;
    const listProducts= await this.getProducts();
    const serchCode=await listProducts.find(element=> element.code===code)
    if (!serchCode) {
      const newProduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
        code: code,
        id: listProducts.length+1 ,
      };
      if (!infProd.includes(undefined)) {
       listProducts.push(newProduct);
       await fs.writeFile(this.path, JSON.stringify(listProducts,null,'\t'));
      } else {
        console.error("You must complete all the files to add a new product");
      }
    } else {
      return console.log("El codigo ya se encuentra en uso");
    }
  }

  async getProductsById(id) {
    const listProducts= await this.getProducts();
    const serchById = listProducts.find((element) => id === element.id);
    if (!serchById) {
      return console.log("not found");
    } else {
      return console.log(serchById);
    }
  }
  async updateProduct(id,newtitle, newdescription, newprice, newthumbnail, newstock, newcode){
    const listProducts= await this.getProducts();
    const serchById = listProducts.findIndex((element) => id === element.id);
    if (serchById<0) {
      return console.log("not found");
    } else {
      const product= listProducts[serchById]
      const update={
        ...product,
        title: newtitle,
        description: newdescription,
        price: newprice,
        thumbnail: newthumbnail,
        stock: newstock,
        code: newcode,
      }
      listProducts[serchById]=update;
      await fs.writeFile(this.path, JSON.stringify(listProducts,null,'\t'));
        return update;
    }

  }
  async deleteProduct(id) {
    const listProducts= await this.getProducts();
    const serchById = listProducts.findIndex((element) => id === element.id);
    if (!serchById) {
      return console.log("the element doesent exist");
    } else {
      listProducts.splice(serchById);
      console.log("Element deleted");
      await fs.writeFile(this.path, JSON.stringify(listProducts,null,'\t'));
    }
  }
}
const productManager = new ProductManager("./products/products.json");


productManager.deleteProduct(0);