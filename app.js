//create server
const express=require('express');
const productsManager=require("./ProductManager");
const products= new productsManager();
const PORT= 4000;
const app=express();
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send("Bienvenido a mi servidor de pruebas backend")
    });

app.get('/products',(async (req,res)=>{
 const productFound=await products.getProducts();
 const limit =req.query.limit
 if (!productFound){
     res.status(404).send("products dont found")
 } else{
     if(!limit){
        res.send(productFound)
     }else{
        productFound.length=limit
        res.send(productFound)
     }
 }
}));

app.get('/products/:pId', (async (req,res) => {

    const pId=req.params.pId;
    const id= await products.getProductsById(pId);
    console.log(pId)
    
    if(id){
    
    res.send(id)
    
    }else{
    
    return res.status(404).send("Produnct not found")
    
    };
    
    })); 


    app.listen(PORT, () => {
        const msg = `
        Server listen on http://localhost:${PORT}
          
        Pruebas:
      
        http://localhost:${PORT}/products
        http://localhost:${PORT}/products?limit=5
        http://localhost:${PORT}/product/1
      `;
        console.log(msg);
      });
      