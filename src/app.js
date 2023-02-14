//create server
import express from"express";
import routerProd  from './routes/product.js'
import routerCart from "./routes/cart.js";
import {__dirname} from './utils/path.js'

const PORT = 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/static', express.static(__dirname + '/../public'))
app.use('/api/products', routerProd)
app.use('/api/cart', routerCart)




app.listen(PORT, () => {
    const msg = `
        Server listen on http://localhost:${PORT}
          
        Pruebas:
      
        http://localhost:${PORT}/api/products
        http://localhost:${PORT}/api/products?limit=5
        http://localhost:${PORT}/api/product/1
        http://localhost:${PORT}/api/cart
        http://localhost:${PORT}/api/cart/1
      `;
    console.log(msg);
});
