//create server
import express from"express";
import routerProd  from './routes/product.js'
import {__dirname} from './utils/path.js'

const PORT = 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/static', express.static(__dirname + '/../public'))
app.use('/products', routerProd)




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
