import {Router} from"express"
import { ProductManager } from "../controllers/ProductManager.js";
const products = new ProductManager("./models/products.json");
const routerProd=Router()


routerProd.get('/', (req, res) => {
    res.send("Bienvenido a mi servidor de pruebas backend")
});
routerProd.get('/products', (async (req, res) => {
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
routerProd.get('/products/:pid', async (req, res) => {

    try {
        const id = parseInt(req.params.pid)
        const result = await products.getProductById(id)
        const send = result ? `Se ha encontrado el producto "${result.title}" asociado con el ID: ${result.id}` : `No se pudo encontrar un producto`
        res.send(send)
    } catch (error) {
        console.log(error);
    }

})
routerProd.post('/products', async (req, res) => {
    try {
        const mens = await products.addProduct(req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})
routerProd.delete('/products/:pid', async (req, res) => {
    try {
        const mens = await products.deleteProduct(req.params.pid)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }

})
routerProd.put('/products/:pid', async (req, res) => {
    try {
        const mens = await products.updateProduct(req.params.pid, req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})

export default routerProd