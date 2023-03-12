import { ManagerMongoDB } from "../../../db/gestorMongoDb";


const schema ={
    name: {type:String, require:true,max:50},
    email:{type:String, require:true,max:50},
    menssage:{type:String, require:true}
}

export class MensajeMongoDB extends ManagerMongoDB {
    constructor(){
        super(process.env.MONGODBURL,"message",schema)
    }
}