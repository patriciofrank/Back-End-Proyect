import { ManagerMongoDB } from "../../../db/gestorMongoDb.js";


const schema ={
    name: {type:String, require:true,max:50},
    email:{type:String, require:true,max:50},
    menssage:{type:String, require:true}
}

export class MessageMongoDB extends ManagerMongoDB {
    constructor(){
        super(process.env.MONGODBURL,"message",schema)
    }

}