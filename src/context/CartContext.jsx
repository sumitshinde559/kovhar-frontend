import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = [];

function getCartKey() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.email) {
    return "cart_guest";
  }

  return `cart_${user.email}`;
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existingItem = state.find(
        (item) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize,
      );

      if (existingItem) {
        return state.map((item) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item,
        );
      }

      return [...state, action.payload];
    }

    case "INCREASE":
      return state.map((item) =>
        item._id === action.payload._id &&
        item.selectedSize === action.payload.selectedSize
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

    case "DECREASE":
      return state
        .map((item) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE":
      return state.filter(
        (item) =>
          !(
            item._id === action.payload._id &&
            item.selectedSize === action.payload.selectedSize
          ),
      );

    case "UPDATE_SIZE":
      return state.map((item) =>
        item._id === action.payload.productId &&
        item.selectedSize === action.payload.oldSize
          ? {
              ...item,
              selectedSize: action.payload.newSize,
            }
          : item,
      );

    case "CLEAR":
      return [];

    case "LOAD":
      return action.payload;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, initialState, () => {
    const key = getCartKey();
    const storedCart = localStorage.getItem(key);

    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const key = getCartKey();

    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({
      type: "ADD",
      payload: {
        ...product,
        quantity: product.quantity || 1,
      },
    });
  };

  const increaseQuantity = (cartItem) => {
    dispatch({
      type: "INCREASE",
      payload: cartItem,
    });
  };

  const decreaseQuantity = (cartItem) => {
    dispatch({
      type: "DECREASE",
      payload: cartItem,
    });
  };

  const removeFromCart = (cartItem) => {
    dispatch({
      type: "REMOVE",
      payload: cartItem,
    });
  };

  const updateSize = (productId, oldSize, newSize) => {
    dispatch({
      type: "UPDATE_SIZE",
      payload: {
        productId,
        oldSize,
        newSize,
      },
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR",
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        updateSize,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
