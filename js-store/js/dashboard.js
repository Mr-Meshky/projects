"use strict";

import { authHandler } from "./utils/authorazation.js";
import { getCart, update } from "./utils/local.js";
import { shortenText } from "./utils/stringFun.js";

const mainContent = document.getElementById("container");
const logoutButton = document.querySelector("button");
const totalPrice = document.getElementById("total-price");
let toShow = [];
let productCart = getCart() || [];

// renderCart
const renderProducts = () => {
  toShow = [...new Set(productCart.map(JSON.stringify))].map(JSON.parse);

  if (productCart.length === 0) {
    mainContent.innerHTML = "<h2>Your shopping cart is empty</h2>";
    calculateTotalPrice();
    return;
  }

  mainContent.innerHTML = "";
  toShow.forEach((product) => {
    let qty = 0;
    productCart.forEach((item) => {
      if (item.id === product.id) {
        qty++;
      }
    });

    const JSX = `
      <li id="card">
        <div>
          <img src=${product.image} />
          <span>
            <h3>${shortenText(product.title)}</h3>
            <p class="info-product">$ ${product.price}</p>
            <div class="buttons" >
              <button id="remove" data-id="${product.id}" >Remove</button>
              <span>
                  <button class="number-btn" id="minus" data-id="${
                    product.id
                  }" >-</button>                  
                  <p class="info-product" >${qty}</p>
                  <button class="number-btn" id="plus" data-id="${
                    product.id
                  }" >+</button>
              </span>
            </div>
          </span>
        </div>
      </li>
    `;
    mainContent.innerHTML += JSX;
  });

  calculateTotalPrice(productCart);
};

const increase = (id) => {
  const newProduct = productCart.find((product) => product.id === +id);
  productCart.push(newProduct);
  update(productCart);
  renderProducts();
};

const decrease = (id) => {
  const index = productCart.findIndex((p) => p.id === +id);
  productCart.splice(index, 1);
  update(productCart);
  renderProducts();
};

const remove = (id) => {
  productCart = productCart.filter((product) => product.id !== +id);
  update(productCart);
  renderProducts();
};

const calculateTotalPrice = () => {
  const total = productCart.reduce((acc, cur) => (acc += cur.price), 0);
  totalPrice.innerText = "$ " + Math.round(total);
};

const handleEvent = (event) => {
  const tagName = event.target.tagName;
  const id = event.target.dataset.id;
  const type = event.target.innerText;

  if (tagName != "BUTTON") return;

  switch (type) {
    case "+":
      increase(id);
      break;
    case "-":
      decrease(id);
      break;
    case "Remove":
      remove(id);
      break;
  }
};

const init = () => {
  authHandler();

  renderProducts(productCart);
};

const logoutHandler = () => {
  document.cookie =
    "token=token; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/";
  location.assign("./index.html");
};

document.addEventListener("DOMContentLoaded", init);
mainContent.addEventListener("click", handleEvent);
logoutButton.addEventListener("click", logoutHandler);
