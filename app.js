//create server
const express=require('express');
const productsManager=require("./ProductManager");
const products= new productsManager("./products/products.json");

const app=express();
app.get('/',(req,res)=>{
    res.send("Bienvenido a mi servidor de pruebas backend")
    });

app.get('/products',(async (req,res)=>{
 await res.send(products.getProducts());
 await console.log(products.getProducts());
}));

// app.get('/products/:pId',(req,res)=>{
//     const pId=req.params.pId;
//     const id=products.getProductsById(pId);
//     if(!id){
//       console.log(id)
//     }else{
//     return res.status(404).send("Produnct not found")
//     };
//     });
app.listen(3000,()=>{
    console.log("Server is up and running on port 3000")
})