import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/config";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
};

const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  return api.get("/products").then((data) => data);
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export const useProductsDetails = (store, id) => {
  const products = store.products.products;
  const product = products.find((p) => p.id === +id);
  let status;

  if (product === undefined && !products.length) {
    status = "loading";
  } else if (!product === undefined && !!products.length) {
    status = "";
  } else if (!products.length || product === undefined) {
    status = "notfound";
  }

  return { status, product };
};

export default productsSlice.reducer;
export { fetchProducts };
