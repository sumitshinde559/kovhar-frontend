export const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

const updateSize = (id, oldSize, newSize, quantity) =>
  dispatch({
    type: "UPDATE_SIZE",
    payload: {
      _id: id,
      oldSize,
      newSize,
      quantity,
    },
  });
