import { FaListUl } from "react-icons/fa";

import { createQueryObject } from "../helpers/helper";
import { categories } from "../constants/list";

import styles from "./Sidebar.module.css";

function Sidebar({ setQuery, query }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();
    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={
              query.category === category.type.toLowerCase()
                ? styles.selected
                : ""
            }
          >
            {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
