import api from "./../services/config";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

function ProdcutProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await api.get("/products"));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}

const useProducts = () => useContext(ProductContext);
const useProductsDetails = (id) => {
  const products = useContext(ProductContext);
  const product = useContext(ProductContext).find((p) => p.id === id);
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

export default ProdcutProvider;
export { useProducts, useProductsDetails };
