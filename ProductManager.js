const fs = require("fs/promises");
class ProductManager {
  // static counterId=0;
  constructor() {
    this.products = [];
    this.path = "products.json";
  }
  static id = 0;

  writeProducts = async (productos) => {
    await fs.writeFile(
      this.path,
      JSON.stringify(productos, null, 2),
      (error) => {
        if (error) throw error;
      }
    );
  };
  readProducts = async () => {
    let allProducts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(allProducts);
  };
  // Add new Products
  addProduct = async (title, description, price, thumbnail, stock, code) => {
    let newProduct = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      stock: stock,
      code: code,
    };
    ProductManager.id++;
    this.products.push({
      ...newProduct,
      id: ProductManager.id,
    });
    await this.writeProducts(this.products);
  };
  // get all products
  getProducts = async () => {
    let productsAll = await this.readProducts();
    console.log(productsAll);
    return productsAll
  };
  exist = async (id) => {
    let productsAll = await this.readProducts();
    return productsAll.find((product) => product.id === Number(id));
  };
  // filter a product by id
  getProductsById = async (id) => {
    if(await this.exist(id)){
       console.log(await this.exist(id))
       return(await this.exist(id))
      }else {
        console.log("NOT FOUND");
        return false;
      }
  };

  // // Change product information
  updateProduct = async ({ id, ...product }) => {
    if ((await this.deleteProduct(id)) === false) {
      console.log("The product dont exist");
    } else {
      let prod = await this.readProducts();
      let modifiedProd = [
        {
          ...product,
          id:id,
        },
        ...prod,
      ];
      await this.writeProducts(modifiedProd);
      console.log("Succesfully modified product");
    }
  };
  // delete product by the id
  deleteProduct = async (id) => {
    if (await this.exist(id)) {
      let products = await this.readProducts();
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
      console.log("Product Succesfully deleted")
    } else {
      console.log("not found");
      return false
    }
  };
}
const testing = new ProductManager();
module.exports=ProductManager