import { Router } from "express";
import { getManagerMenssages } from "../dao/daoManager.js";

const uRouter = Router()


uRouter.get('/', (req, res) => {
    try {
        const users = getManagerMenssages()
        res.send({ resultado: 'success', valores: users })
    }
    catch (err) {
        res.send("Error en consulta a users , Mensaje:", err)
    }
})

export default uRouter