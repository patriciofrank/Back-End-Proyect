import { Router } from "express"
import { getManagerCart } from "../dao/daoManager.js";
const cart = getManagerCart();
const routerCart = Router()



routerCart.get('/', ( (req, res) => {
    try {
        const cartFound = cart.getElement();

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

routerCart.post('/',  (req, res) => {
    try {
        const mens =  cart.addElement(req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})
routerCart.delete('/:cid',  (req, res) => {
    try {
        const mens =  cart.deleteElement(req.params.cid)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }

})
routerCart.delete('/',  (req, res) => {
    try {
        const mens = cart.deleteElement(req.params)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }

})


export default routerCart