"use strict";

import { postData } from "./utils/httpReq.js";
import { setCookie } from "./utils/cookie.js";
import { authHandler } from "./utils/authorazation.js";
import { validateForm } from "./utils/validation.js";

const inputsBox = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();
  const username = inputsBox[0].value;
  const password = inputsBox[1].value;

  const validation = validateForm(username, password);
  if (!validation) return;

  const data = {
    username,
    password,
  };

  const response = await postData("auth/login", data);
  setCookie(response.token);
  location.assign("index.html");
};

const init = () => {
  authHandler();
};

loginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", init);
