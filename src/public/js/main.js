const socket = io();

const form = document.querySelector("#form");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const thumbnailInput = document.querySelector("#thumbnail");
const table = document.querySelector("#table");

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
const template = Handlebars.compile(
"<td>{{title}}</td><td>{{price}}</td><td><img src={{thumbnail}} style='width:60px;'></img></td>"
);
const tr = document.createElement("tr");
tr.innerHTML = template(product);
table.appendChild(tr);
});