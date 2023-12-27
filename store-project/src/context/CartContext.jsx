import { createContext, useContext, useReducer } from "react";

import { getCarts, setCarts, sumProducts } from "../helpers/helper";

const initialState = getCarts() || {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      setCarts({
        ...state,
        checkout: false,
        ...sumProducts(state.selectedItems),
      });
      return getCarts();
    case "INCREASE":
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[increaseIndex].quantity++;
      setCarts({
        ...state,
        ...sumProducts(state.selectedItems),
      });
      return getCarts();
    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      setCarts({
        ...state,
        ...sumProducts(state.selectedItems),
      });
      return getCarts();
    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      setCarts({
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumProducts(newSelectedItems),
      });
      return getCarts();
    case "CHECKOUT":
      setCarts({
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      });
      return getCarts();
    default:
      throw new Error("Invalid action!");
  }
};

const CartContext = createContext();

function CardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export default CardProvider;
export { useCart };
