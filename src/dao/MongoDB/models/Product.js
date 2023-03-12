import { ManagerMongoDB } from "../../../db/gestorMongoDb.js";


const schema ={
    title: {type:String, require:true,max:50},
    description:{type:String, require:true,max:50},
    thumbnail:{type:String},
    stock:{type:Number, require:true},
    code:{type:Number, require:true}
}

export class ProductMongoDB extends ManagerMongoDB {
    constructor(){
        super(process.env.MONGODBURL,"products",schema)
    }
}