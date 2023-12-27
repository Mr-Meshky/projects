import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useProducts } from "../context/ProdcutContext";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";

import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

import styles from "./ProductsPage.module.css";
import DocumentMeta from "react-document-meta";

const meta = {
  title: "Style Squad",
  description: "Style squad Store",
};

function ProductsPage() {
  const products = useProducts();
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});

  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <DocumentMeta {...meta}>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        {!displayed.length && <Loader />}
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
