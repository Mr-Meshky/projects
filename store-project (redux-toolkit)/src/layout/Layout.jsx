import { Link } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useSelector } from "react-redux";

import styles from "./Layout.module.css";

function Layout({ children }) {
  const state = useSelector((store) => store.carts);

  return (
    <>
      <header>
        <Link to="/products">StyleSquad</Link>
        <div>
          <Link to="/checkout">
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </Link>
        </div>
      </header>
      {children}
      <footer>
        <p>
          Developed by <a href="https://mrmeshky.ir">MrMeshky</a> with ❤
        </p>
      </footer>
    </>
  );
}

export default Layout;
