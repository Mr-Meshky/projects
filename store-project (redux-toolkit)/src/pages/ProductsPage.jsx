import { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import Loader from "../components/Loader";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";
import { fetchProducts } from "../features/products/productSlice";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((store) => store.products);

  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});

  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
    
  }, [products]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  const meta = {
    title: "Style Squad",
    description: "Style squad Store",
  };

  return (
    <DocumentMeta {...meta}>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        {isLoading && <Loader />}
        <div className={styles.products}>
          {displayed.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
        <Sidebar setQuery={setQuery} query={query} />
      </div>
    </DocumentMeta>
  );
}

export default ProductsPage;
