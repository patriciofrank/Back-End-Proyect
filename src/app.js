//create server
import "dotenv/config"
import express from "express";
import routerProd from './routes/product.js'
import routerCart from "./routes/cart.js";
import { __dirname } from './path.js'
import { engine } from "express-handlebars";
import * as path from "path"
import { Server } from "socket.io";
import { MessageMongoDB } from "./dao/MongoDB/models/Message.js"
import { ProductMongoDB } from "./dao/MongoDB/models/Product.js";


const app = express();
const server = app.listen(app.get("port"), () => {
  const msg = `
Server listen on http://localhost:${app.get("port")}
  
Pruebas:

http://localhost:${app.get("port")}/api/products
http://localhost:${app.get("port")}/api/products?limit=5
http://localhost:${app.get("port")}/api/product/1
http://localhost:${app.get("port")}/api/cart
http://localhost:${app.get("port")}/api/cart/1
`;
console.log(msg);
});

const io = new Server(server)

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.engine("handlebars", engine())
app.set("port", process.env.PORT || 5000)
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "views"))

//routes
app.use('/', express.static(__dirname + "/public"))
app.use('/api/products', routerProd)
app.use('/api/cart', routerCart)
app.get('/', async (req, res) => {
  res.render("home", {
    titulo: "Home",
    hometitle: "Bienvenido a mi proyecto back-end"
  })
})


io.on("connection", async (socket) => {

  console.log("New conection", socket.id);

  socket.on("message", async (info) => {
    const data =await MessageMongoDB.getElements()
    console.log(data)
    const managerMessage = new data.MessageMongoDB
    managerMessage.addElements([info]).then(() => {
      managerMessage.getElements().then((message) => {
        console.log(message)
        socket.emmit("allMessages", message)
      })
    })
  })

  socket.on("Disconnect", () => {
    console.log(socket.id, "disconnected");
  });

  socket.on('realtimeProducts', async () => {
    const allProducts = await ProductMongoDB.getElements()
    console.log(allProducts)
  })

  socket.on("add-product", (id,product) => {
   ProductMongoDB.updateElement(id,product);
    io.emit("update-products", product);
  });


  app.use((err, req, res, next) => {

    console.log(err);

    res.status(500).json({ err, message: "Something went wrong, sorry" });

  })
});