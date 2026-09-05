import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resolveMediaUrl } from "@/lib/resolveMediaUrl";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/catalog/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const json = await response.json();
      const data = Array.isArray(json) ? json : json.data;

      return data.map(product => ({
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category?.name || "UNCATEGORIZED",
        description: product.description,
        isFeatured: !!product.is_featured,
        image: product.images?.length > 0 ? resolveMediaUrl(product.images[0].image_url) : "/placeholder.png",
        sizes: product.variants.map(variant => ({
          id: variant.id,
          size: variant.size || variant.name,
          price: parseFloat(variant.price),
          sku: variant.sku,
        })),
        price: {
          min: Math.min(...product.variants.map(v => parseFloat(v.price))),
          max: Math.max(...product.variants.map(v => parseFloat(v.price)))
        }
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  cart: [],
  selectedSize: {},
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectSize: (state, action) => {
      const { productId, variantId } = action.payload;
      state.selectedSize[productId] = variantId;
    },
    addToCart: (state, action) => {
      const { productId, variantId, size, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const product = state.products.find((p) => p.id === productId);
        const variant = product?.sizes.find((s) => s.id === variantId);

        state.cart.push({
          productId,
          variantId,
          size: size ?? variant?.size,
          quantity,
          price: variant?.price || 0,
        });
      }
    },
    updateCartQuantity: (state, action) => {
      const { productId, variantId, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          state.cart.splice(itemIndex, 1);
        } else {
          state.cart[itemIndex].quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      const { productId, variantId } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      );
    },
    setCartServerId: (state, action) => {
      const { productId, variantId, cartItemId } = action.payload;
      const item = state.cart.find(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (item) item.cartItemId = cartItemId;
    },
    clearCart: (state) => {
      state.cart = [];
      state.selectedSize = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectSize,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  setCartServerId,
  clearCart
} = productSlice.actions;

export default productSlice.reducer;
