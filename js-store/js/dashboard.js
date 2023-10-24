"use strict";

import { authHandler } from "./utils/authorazation.js";

const init = () => {
  authHandler();
};

document.addEventListener("DOMContentLoaded", init);
