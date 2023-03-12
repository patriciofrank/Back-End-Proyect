import { ManagerMongoDB } from "../../../db/gestorMongoDb.js";


const schema ={
    title: {type:String, require:true,max:50},
    description:{type:String, require:true,max:50},
    Qty:{type:Number, require:true}
}

export class CartMongoDB extends ManagerMongoDB {
    constructor(){
        super(process.env.MONGODBURL,"cart",schema)
    }

}