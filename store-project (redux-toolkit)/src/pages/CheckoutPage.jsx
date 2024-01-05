import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import DocumentMeta from "react-document-meta";

import BasketCard from "../components/BasketCard";
import BasketSidebar from "../components/BasketSidebar";
import picture from "./../assets/empty-basket.webp";

import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const state = useSelector((store) => store.carts);

  if (!state.itemsCounter) {
    return (
      <div className={styles.emty}>
        <h1>Unfortunately, your shopping cart is empty!</h1>
        <img src={picture} alt="Unfortunately, your shopping cart is empty!" />
        <Link to="/products">
          Go to the products page <MdArrowForwardIos />
        </Link>
      </div>
    );
  }

  return (
    <DocumentMeta title="Style Squad">
      <div className={styles.container}>
        <BasketSidebar state={state} />
        <div className={styles.prodcuts}>
          {state.selectedItems.map((product) => (
            <BasketCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </DocumentMeta>
  );
}

export default CheckoutPage;
