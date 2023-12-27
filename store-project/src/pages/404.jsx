import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import picture from "./../assets/404.webp";

import styles from "./404.module.css";

function PageNotFound() {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Ooops...</h1>
        <h3>Page not found</h3>
        <button onClick={backHandler}>
          Go Back <MdArrowForwardIos />
        </button>
      </div>
      <img src={picture} alt="Page not found picture" />
    </div>
  );
}

export default PageNotFound;
