const fs = require("fs/promises");
const { existsSync } = require("fs");

class ProductManager {
  // static counterId=0;
  constructor(path) {
    this.path = path;
  }
  // Get all the products
  async getProducts() {
    if (existsSync(this.path)) {
      const products = await fs.readFile(this.path, "utf-8");
      const listProducts = await JSON.parse(products);
      return listProducts;
    } else {
      const newList = [];
      // await fs.writeFile("./products/products.json",JSON.stringify(newList,null,'\t'));
      return newList;
    }
  }
  // Add new Products
  async addProduct(title, description, price, thumbnail, stock, code) {
    // const to verify if all the product file are completed
    const infProd = title + description + price + thumbnail + stock + code;
    const listProducts = await this.getProducts();
    const serchCode = await listProducts.find(
      (element) => element.code === code
    );
    if (!serchCode) {
      // ProductManager.counterId++;
      const newProduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
        code: code,
        // id:ProductManager.counterId,
        id: listProducts.length + 1,
      };
      if (!infProd.includes(undefined)) {
        listProducts.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(listProducts, null, "\t"));
      } else {
        console.error("You must complete all the files to add a new product");
      }
    } else {
      return console.log("The product code already exist");
    }
  }
  // filter a product by id
  async getProductsById(id) {
    const listProducts = await this.getProducts();
    const serchById = listProducts.find((element) => id === element.id);
    if (!serchById) {
      return console.log("The id dont exist please try other id");
    } else {
      console.log(serchById);
      return serchById;
    }
  }
  // Change product information
  async updateProduct(
    id,
    newtitle,
    newdescription,
    newprice,
    newthumbnail,
    newstock,
    newcode
  ) {
    const listProducts = await this.getProducts();
    const serchById = listProducts.findIndex((element) => id === element.id);
    if (serchById < 0) {
      return console.log("The id dont exist please try other id");
    } else {
      const product = listProducts[serchById];
      const update = {
        ...product,
        title: newtitle,
        description: newdescription,
        price: newprice,
        thumbnail: newthumbnail,
        stock: newstock,
        code: newcode,
      };
      listProducts[serchById] = update;
      console.log("The product was sussesfuly updated");
      await fs.writeFile(this.path, JSON.stringify(listProducts, null, "\t"));
      return update;
    }
  }
  // delete product by the id
  async deleteProduct(id) {
    const listProducts = await this.getProducts();
    const serchById = listProducts.findIndex((element) => id === element.id);
    console.log(serchById);
    if (serchById < 0) {
      return console.log("the element doesent exist");
    } else {
      console.log("Element in index " + serchById + " was deleted");
      listProducts.splice(serchById, 1);
      await fs.writeFile(this.path, JSON.stringify(listProducts, null, "\t"));
    }
  }
}

const productManager = new ProductManager("./products/products.json");

productManager.getProducts();

module.exports = ProductManager;
