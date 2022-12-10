class ProductManager {
  static idGenerator = 0;
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, stock, code) {
    const serchCode = this.products.find((element) => code === element.code);
    const infProd = title + description + price + thumbnail + stock + code;
    if (!serchCode) {
      ProductManager.idGenerator++;
      const newProduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
        code: code,
        id: ProductManager.idGenerator,
      };
      if (!infProd.includes(undefined)) {
        this.products.push(newProduct);
      } else {
        console.error("Complete all the files");
      }
    } else {
      return console.log("El codigo ya se encuentra en uso");
    }
  }

  getProductsById(id) {
    const serchById = this.products.find((element) => id === element.id);
    if (!serchById) {
      return console.log("not found");
    } else {
      return console.log(serchById);
    }
  }
}
const productManager = new ProductManager();
