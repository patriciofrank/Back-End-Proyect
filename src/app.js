//create server
const express = require('express');
const productsManager = require("./ProductManager");
const products = new productsManager();
const PORT = 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("Bienvenido a mi servidor de pruebas backend")
});

app.get('/products', (async (req, res) => {
    try {
        const productFound = await products.getProducts();
        const limit = req.query.limit
        if (!productFound) {
            res.send("Products dont found")
        } else {
            if (!limit) {
                res.send(productFound)
            } else {
                productFound.length = limit
                res.send(productFound)
            }
        }
    }
    catch (error) {

        console.log(error);

    }
}));

app.get('/products/:pid', async (req, res) => {

    try {
        const id = parseInt(req.params.pid)

        const result = await products.getProductsById(id)


        const send = result ? `Se ha encontrado el producto "${result.title}" asociado con el ID: ${result.id}` : `No se pudo encontrar un producto`

        res.send(send)
    } catch (error) {

        console.log(error);

    }

})

app.listen(PORT, () => {
    const msg = `
        Server listen on http://localhost:${PORT}
          
        Pruebas:
      
        http://localhost:${PORT}/products
        http://localhost:${PORT}/products?limit=5
        http://localhost:${PORT}/product/1
      `;
    console.log(msg);
});
