import { Router } from "express"
import { getManagerCart, getManagerProducts } from "../dao/daoManager.js";
const cart = getManagerCart();
const routerCart = Router()



routerCart.get('/', (async (req, res) => {
    try {
        const cartFound = await cart.getProducts();

        if (!cartFound) {
            res.send("Products dont found")
        } else {

            res.send(cartFound)
        }

    }
    catch (error) {

        console.log(error);

    }
}));

routerCart.post('/', async (req, res) => {
    try {
        const mens = await cart.addProduct(req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})
routerCart.delete('/:cid', async (req, res) => {
    try {
        const mens = await cart.deleteItem(req.params.cid)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }

})
routerCart.delete('/', async (req, res) => {
    try {
        const mens = await cart.deleteCart(req.params)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }

})


export default routerCart