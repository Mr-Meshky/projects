"use strict";

import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { getCart, update } from "./utils/local.js";
import { shortenText } from "./utils/stringFun.js";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const listItems = document.querySelectorAll(".li");
const minValue = document.getElementById("min-value");
const maxValue = document.getElementById("max-value");
const inputElements = document.querySelectorAll(".price-input");

let allProducts = null;
let search = "";
let category = "all";
let minPrice = 0;
let maxPrice = 1500;
let productCart = getCart() || [];

const renderProducts = (products) => {
  mainContent.innerHTML = "";
  products.forEach((element) => {
    const JSX = `
    <li>  
        <img alt=${element.title} src=${element.image} />
        <h4>${shortenText(element.title)}</h4>
        <div id="price">
            <p>$ ${element.price}</p>
            <button class="add-button" data-id="${
              element.id
            }" >Buy <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
        <div id="rate">
            <span>
                <i class="fa-solid fa-star"></i>
                ${element.rating.rate}
            </span>
        </div>
        <div id="count">
            <span>
                <i class="fa-solid fa-user"></i>
                ${element.rating.count}
            </span>
        </div>
    </li>
    `;

    mainContent.innerHTML += JSX;
  });
};

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }

  allProducts = await getData("products");
  renderProducts(allProducts);
};

const filterProducts = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });

  const priceFiltered = filteredProducts.filter((product) => {
    const price = product.price;
    if (price >= minPrice && price <= maxPrice) {
      return product;
    }
  });

  renderProducts(priceFiltered);
};

const searchHandler = () => {
  search = searchInput.value.trim().toLowerCase();
  filterProducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.trim().toLowerCase();

  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.classList.add("selected");
    } else {
      li.classList.remove("selected");
    }
  });

  filterProducts();
};

const priceRange = (minPrice, maxPrice) => {
  if (minPrice > maxPrice) {
    let tempValue = maxPrice;
    maxPrice = minPrice;
    minPrice = tempValue;
  }

  minValue.innerHTML = "$" + minPrice;
  maxValue.innerHTML = "$" + maxPrice;

  filterProducts();
};

const handleEvent = (event) => {
  const tagName = event.target.tagName;
  const id = event.target.dataset.id;
  const type = event.target.innerText;

  if (tagName != "BUTTON") return;
  if (type === "+") {
    increase(id);
  } else if (type === "-") {
    decrease(id);
  } else if (type === "Remove") {
    remove(id);
  } else if (type.toLowerCase().includes("buy")) {
    addToCard(id);
  }
};

const addToCard = (id) => {
  const product = allProducts.find((item) => item.id === +id);
  productCart.push(product);
  update(productCart);
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

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
listItems.forEach((item) => item.addEventListener("click", filterHandler));
mainContent.addEventListener("click", handleEvent);
inputElements.forEach((element) => {
  element.addEventListener("change", (e) => {
    minPrice = +inputElements[0].value;
    maxPrice = +inputElements[1].value;

    priceRange(minPrice, maxPrice);
  });
});
