import { addToCart, removeFromCart, setCartServerId } from "./API_Slices/productSlice";
import { ecommerceApi } from "./API_Query/ecommerceApi";

// The backend only supports a cart for logged-in users (no guest/session cart), and its
// add-item endpoint increments quantity rather than setting it, with no update-quantity
// endpoint at all. So we mirror only add/remove to the server cart when authenticated,
// and keep the local Redux cart as the single source of truth for the UI and checkout.
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

  return result;
};
