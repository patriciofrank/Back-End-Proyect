import {Router} from"express"
import { ProductManager } from "../controllers/ProductManager.js";
const products = new ProductManager("models/products.json");
const routerProd=Router()



routerProd.get('/', (async (req, res) => {
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
routerProd.get('/:pid', async (req, res) => {

    try {
        const id = parseInt(req.params.pid)
        const result = await products.getProductById(id)
        res.send(result)
    } catch (error) {
        console.log(error);
    }

})
routerProd.post('/', async (req, res) => {
    try {
        const mens = await products.addProduct(req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})
routerProd.delete('/:pid', async (req, res) => {
    try {
        const mens = await products.deleteProduct(req.params.pid)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }

})
routerProd.put('/:pid', async (req, res) => {
    try {
        const mens = await products.updateProduct(req.params.pid, req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})

export default routerProd