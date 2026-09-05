import { addToCart, removeFromCart, updateCartQuantity, setCartServerId } from "./API_Slices/productSlice";
import { ecommerceApi } from "./API_Query/ecommerceApi";

// The backend only supports a cart for logged-in users (no guest/session cart), so we mirror
// add/remove/update-quantity to the server cart only when authenticated, and keep the local
// Redux cart as the single source of truth for the UI and checkout regardless of whether the
// server sync succeeds (a failed sync never breaks the local cart/checkout flow).
export const cartSyncMiddleware = (store) => (next) => (action) => {
  const stateBefore = store.getState();
  const token = stateBefore.auth?.token;

  let removedItem = null;
  if (token && action.type === removeFromCart.type) {
    const { productId, variantId } = action.payload;
    removedItem = stateBefore.products.cart.find(
      (item) => item.productId === productId && item.variantId === variantId
    );
  }

  let updatedItem = null;
  if (token && action.type === updateCartQuantity.type) {
    const { productId, variantId } = action.payload;
    updatedItem = stateBefore.products.cart.find(
      (item) => item.productId === productId && item.variantId === variantId
    );
  }

  const result = next(action);

  if (!token) return result;

  if (action.type === addToCart.type) {
    const { productId, variantId, quantity } = action.payload;
    if (variantId) {
      store
        .dispatch(
          ecommerceApi.endpoints.addToCart.initiate({
            product_variant_id: variantId,
            quantity,
          })
        )
        .unwrap()
        .then((res) => {
          store.dispatch(setCartServerId({ productId, variantId, cartItemId: res.id }));
        })
        .catch(() => {
          // Best-effort sync — a failure here shouldn't break the local cart/checkout flow.
        });
    }
  }

  if (action.type === removeFromCart.type && removedItem?.cartItemId) {
    store
      .dispatch(ecommerceApi.endpoints.removeFromCart.initiate(removedItem.cartItemId))
      .catch(() => {});
  }

  if (action.type === updateCartQuantity.type && updatedItem?.cartItemId) {
    const { quantity } = action.payload;
    if (quantity > 0) {
      store
        .dispatch(
          ecommerceApi.endpoints.updateCartItem.initiate({
            itemId: updatedItem.cartItemId,
            quantity,
          })
        )
        .catch(() => {});
    } else {
      // quantity <= 0 already removed the item from local state (see
      // updateCartQuantity's reducer) — mirror that as a real delete server-side.
      store
        .dispatch(ecommerceApi.endpoints.removeFromCart.initiate(updatedItem.cartItemId))
        .catch(() => {});
    }
  }

  return result;
};
