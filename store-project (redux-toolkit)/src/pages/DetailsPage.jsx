import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SiOpenproject } from "react-icons/si";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DocumentMeta from "react-document-meta";

import Loader from "./../components/Loader";
import PageNotFound from "./404";
import {
  fetchProducts,
  useProductsDetails,
} from "../features/products/productSlice";

import styles from "./DetailsPage.module.css";

function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { status, product } = useSelector((store) =>
    useProductsDetails(store, id)
  );

  if (status === "loading") return <Loader />;
  if (status === "notfound") {
    return <PageNotFound />;
  }

  const meta = {
    title: product.title,
    description: product.description,
    meta: {
      charset: "utf-8",
      name: {
        keywords: product.title.split(" "),
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className={styles.container}>
        <img src={product.image} alt={product.title} title={product.title} />
        <div className={styles.infomation}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}>
            <SiOpenproject />
            {product.category}
          </p>
          <div>
            <span className={styles.price}>
              <IoMdPricetag />
              {product.price} $
            </span>
            <Link to="/products">
              <FaArrowLeft />
              <span>Back to shop</span>
            </Link>
          </div>
        </div>
      </div>
    </DocumentMeta>
  );
}

export default DetailsPage;
