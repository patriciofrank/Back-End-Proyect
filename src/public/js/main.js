const socket = io()
const form = document.querySelector("#form");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const thumbnailInput = document.querySelector("#thumbnail");
const table = document.querySelector("#table");
socket.emit('mensagge','Hola desde el server io  nuevo usuario')

socket.emit("realtimeProducts", products=>{
  console.log(products)
});


form.addEventListener("submit", e => {
e.preventDefault();
if (titleInput.value && priceInput.value && thumbnailInput.value) {

const product = {
title: titleInput.value,
price: priceInput.value,
thumbnail: thumbnailInput.value,
};

socket.emit("add-product", product);
titleInput.value = "";
priceInput.value = "";
thumbnailInput.value = "";
}
});

socket.on("update-products", product => {
const tr = document.createElement("tr");
tr.innerHTML = `<td>${product.title}</td><td>${product.price}</td><td><img src=${product.thumbnail} style="width:150px;"></img></td>`;
table.appendChild(tr);
console.log("Product added successfuly")
});