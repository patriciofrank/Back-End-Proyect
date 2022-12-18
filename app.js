//create server
const express=require('express');
const products=require("./ProductManager")


const app=express();
app.get('/',(req,res)=>{
    res.send("Bienvenido a mi servidor de pruebas backend")
    });

app.get('/products',(async (req,res)=>{
 await res.send(products.getProducts());
}));

app.get('/products/:pId',(req,res)=>{
    const pId=req.params.pId;
    const id=products.getProductsById(pId);
    if(!id){
       res.send(id);
    }else{
        return res.status(404).send("Produnct not found")
    };
    });
app.listen(3000,()=>{
    console.log("Server is up and running on port 3000")
})