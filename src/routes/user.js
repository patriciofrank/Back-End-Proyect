import { Router } from "express";
import { userModel } from "../models/user";

const uRouter = Router()


uRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find()
        res.send({ resultado: 'success', valores: users })
    }
    catch (err) {
        res.send("Error en consulta a users , Mensaje:", err)
    }
})

export default uRouter