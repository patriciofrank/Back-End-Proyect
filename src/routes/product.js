import {Router} from"express"
import { getManagerProducts } from "../dao/daoManager.js";
const product=getManagerProducts()
const routerProd=Router()



routerProd.get('/', ( (req, res) => {
    try {
        const productFound = product.getElement();
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

routerProd.get('/:pid', (req, res) => {

    try {
        const id = parseInt(req.params.pid)
        const result =  product.getElementById(id)
        res.send(result)
    } catch (error) {
        console.log(error);
    }

})
routerProd.post('/', (req, res) => {
    try {
        const mens =  product.addElements(req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})
routerProd.delete('/:pid', (req, res) => {
    try {
        const mens =  product.deleteElement(req.params.pid)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }

})
routerProd.put('/:pid', (req, res) => {
    try {
        const mens =  product.updateElement(req.params.pid, req.body)
        res.send(mens)
    } catch (error) {
        console.log(error);
    }
})

export default routerProd