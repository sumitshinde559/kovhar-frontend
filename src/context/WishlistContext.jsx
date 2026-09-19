import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const WishlistContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function wishlistReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;

    case "ADD":
      if (state.some((item) => item._id === action.payload._id)) {
        return state;
      }

      return [...state, action.payload];

    case "REMOVE":
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], () => {
    const stored = localStorage.getItem("wishlist");

    return stored ? JSON.parse(stored) : [];
  });

  const [loading, setLoading] = useState(false);

  /*
    Get logged-in user's JWT token.
  */
  const getToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("authToken");
  };

  /*
    Load wishlist from MongoDB when logged in.
  */
  useEffect(() => {
    const token = getToken();

    if (!token) return;

    const loadWishlist = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load wishlist.");
        }

        dispatch({
          type: "SET",
          payload: data.wishlist || [],
        });
      } catch (error) {
        console.error("Wishlist loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  /*
    Keep localStorage updated.
    This also allows guest wishlist functionality.
  */
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /*
    ADD TO WISHLIST
  */
  const addToWishlist = async (product) => {
    const token = getToken();

    // Guest user
    if (!token) {
      dispatch({
        type: "ADD",
        payload: product,
      });

      return;
    }

    try {
      const response = await fetch(`${API_URL}/wishlist/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add wishlist item.");
      }

      dispatch({
        type: "ADD",
        payload: product,
      });
    } catch (error) {
      console.error("Add wishlist error:", error);
    }
  };

  /*
    REMOVE FROM WISHLIST
  */
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      // Guest user
      if (!token) {
        dispatch({
          type: "REMOVE",
          payload: productId,
        });

        return;
      }

      const response = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove from wishlist");
      }

      // IMPORTANT:
      // Update React state after successful backend removal
      dispatch({
        type: "REMOVE",
        payload: productId,
      });
    } catch (error) {
      console.error("Remove from wishlist error:", error);
    }
  };
  /*
    TOGGLE WISHLIST
  */
  const toggleWishlist = async (product) => {
    const exists = wishlist.some((item) => item._id === product._id);

    if (exists) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product);
    }
  };

  const isWishlisted = (id) => wishlist.some((item) => item._id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
}
