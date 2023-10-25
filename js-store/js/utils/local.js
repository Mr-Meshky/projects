"use strict";

const update = (newData) => {
  newData = JSON.stringify(newData);
  localStorage.setItem("CART", newData);
};

const getCart = () => {
  const data = localStorage.getItem("CART");
  return JSON.parse(data);
};

export { update, getCart };
