//create server
import express from "express";
import routerProd from './routes/product.js'
import routerCart from "./routes/cart.js";
import { __dirname } from './path.js'
import { engine } from "express-handlebars";
import * as path from "path"
import { Server } from "socket.io";
import { ProductManager } from "./controllers/ProductManager.js";
const products = new ProductManager("src/models/products.json");

const PORT = 8080;
const app = express();
const server = app.listen(PORT, () => {
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
const io = new Server(server)
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))

//routes
app.use('/static', express.static(__dirname + './public'))
app.use('/api/products', routerProd)
app.use('/api/cart', routerCart)

app.get('/',async (req, res) => {
  const productsList = await products.getProducts()
  res.render("home", {
    title: "BackendProyect",
    productsList
  })
})
app.get('/realtimeProducts',async (req, res) => {
  const productsList = await products.getProducts()
  res.render("home", {
    title: "BackendProyect",
    productsList
  })
})


io.on("connection", (socket) => {
  console.log("Connected to socket")
  socket.on('message', info => { console.log(info) })
  socket.broadcast.emit('event-admin', 'hi you are the admin') 
  socket.emit('event-general', "Hi to every users")
})