const products=require("./ProductManager")
const product = new products("./products/products.json")
console.log(product.getProducts())
//create server
const express=require('express')

const app=express();
app.get('/',(req,res)=>{
    res.send("Bienvenido a mi servidor de pruebas backend")
    });

app.get('/products',(async (req,res)=>{
await res.send(productList.getProducts())
}));

app.get('/products/:pId',(req,res)=>{
    const pId=req.params.pId;
    const id=product.find(product=>product.id === +pId);
    if(!id){
        return res.status(404).send("Produnct not found")
    }else{
        res.send(product);
    };
    });
app.listen(8080,()=>{
    console.log("Server is up and running on port 8080")
})