import { Navigate, Route, Routes } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PageNotFound from "./pages/404";
import ProdcutProvider from "./context/ProdcutContext";
import CardProvider from "./context/CartContext";
import Layout from "./layout/Layout";

function App() {
  return (
    <CardProvider>
      <ProdcutProvider>
        <Layout>
          <Routes>
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </ProdcutProvider>
    </CardProvider>
  );
}

export default App;
