//create server
import express from "express";
import routerProd from './routes/product.js'
import routerCart from "./routes/cart.js";
import { __dirname } from './path.js'
import { engine } from "express-handlebars";
import * as path from "path"
import { Server } from "socket.io";
import { ProductManager } from "./controllers/ProductManager.js";
import * as http from 'http'
const products = new ProductManager("src/models/products.json");
const app = express();

// //middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.engine("handlebars", engine())
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

//routes
app.use('/', express.static(__dirname + './public'))
app.use('/api/products', routerProd)
app.use('/api/cart', routerCart)


const server = http.createServer(app);


const io = new Server(server);


app.get("/", async (req, res) => {
  const productsList = products.getProducts();

  res.render("home", {
    title: "BackendProyect",
    productsList
  })

});


io.on("connection", socket => {

  console.log("New conection", socket.id);

  socket.on("add-product", product => {
    products.addProduct(product);
    io.emit("update-products", product);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
  })
});


app.use((err, req, res, next) => {

  console.log(err);

  res.status(500).json({ err, message: "Something went wrong, sorry" });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {

  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);

});

server.on("error", err => {
  console.log(`Algo salio mal: ${err}`);

})
