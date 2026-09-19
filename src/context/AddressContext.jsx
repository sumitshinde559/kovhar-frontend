import { createContext, useContext, useEffect, useReducer } from "react";

const AddressContext = createContext();

const initialState = [];

function getUserAddressKey() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.email) {
    return "addresses_guest";
  }

  return `addresses_${user.email}`;
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "UPDATE":
      return state.map((address) =>
        address.id === action.payload.id ? action.payload : address,
      );

    case "DELETE":
      return state.filter((address) => address.id !== action.payload);

    case "SELECT":
      return state.map((address) => ({
        ...address,
        selected: address.id === action.payload,
      }));

    case "LOAD":
      return action.payload;

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function AddressProvider({ children }) {
  const [addresses, dispatch] = useReducer(reducer, initialState, () => {
    const key = getUserAddressKey();
    const stored = localStorage.getItem(key);

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const key = getUserAddressKey();

    localStorage.setItem(key, JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (address) =>
    dispatch({
      type: "ADD",
      payload: {
        ...address,
        id: crypto.randomUUID(),
        selected: false,
      },
    });

  const updateAddress = (address) =>
    dispatch({
      type: "UPDATE",
      payload: address,
    });

  const deleteAddress = (id) =>
    dispatch({
      type: "DELETE",
      payload: id,
    });

  const selectAddress = (id) =>
    dispatch({
      type: "SELECT",
      payload: id,
    });

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
