import { API_Query } from "./APIQuery";

export const ecommerceApi = API_Query.injectEndpoints({
  endpoints: (builder) => ({
    // -------------------------
    // 1. Catalog Endpoints
    // -------------------------
    getCategories: builder.query({
      query: () => `catalog/categories`,
    }),
    getBrands: builder.query({
      query: () => `catalog/brands`,
    }),
    getProducts: builder.query({
      query: (params) => {
        // params can be { limit: 10, category_slug: 'fruits', search: 'apple', brand_slug: 'farm-fresh' }
        return {
          url: `catalog/products`,
          params,
        };
      },
      providesTags: ["Product"],
    }),
    getProductBySlug: builder.query({
      query: (slug) => `catalog/products/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
    }),

    // -------------------------
    // 2. Review Endpoints
    // -------------------------
    getProductReviews: builder.query({
      query: (productId) => `products/${productId}/reviews`,
      providesTags: (result, error, productId) => [{ type: "Review", id: productId }],
    }),
    addReview: builder.mutation({
      query: ({ productId, data }) => ({
        url: `products/${productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Review", id: productId }],
    }),

    // -------------------------
    // 3. Cart Endpoints
    // -------------------------
    getCart: builder.query({
      query: () => `cart`,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `cart/items`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `cart/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `cart/items/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // -------------------------
    // 4. Wishlist Endpoints
    // -------------------------
    getWishlist: builder.query({
      query: () => `wishlist`,
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (variantId) => ({
        url: `wishlist/${variantId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: (variantId) => ({
        url: `wishlist/${variantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // -------------------------
    // 5. Checkout Endpoints
    // -------------------------
    getShippingZones: builder.query({
      query: () => `shipping/zones`,
    }),
    getShippingMethods: builder.query({
      query: () => `shipping/methods`,
    }),
    applyCoupon: builder.query({
      query: (code) => `promotions/coupons?code=${code}`,
    }),
    placeOrder: builder.mutation({
      query: (data) => ({
        url: `orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
    processPayment: builder.mutation({
      query: (data) => ({
        url: `payments`,
        method: "POST",
        body: data,
      }),
    }),
    initSSLCommerzPayment: builder.mutation({
      query: (data) => ({
        url: `payments/sslcommerz/init`,
        method: "POST",
        body: data,
      }),
    }),

    // -------------------------
    // 6. Auth Endpoints
    // -------------------------
    register: builder.mutation({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    sendOtp: builder.mutation({
      query: () => ({
        url: `auth/send-otp`,
        method: "POST",
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `auth/verify-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    sendCheckoutOtp: builder.mutation({
      query: (data) => ({
        url: `auth/checkout/send-otp`,
        method: "POST",
        body: data,
      }),
    }),
    verifyCheckoutOtp: builder.mutation({
      query: (data) => ({
        url: `auth/checkout/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    // -------------------------
    // 7. User Profile Endpoints
    // -------------------------
    getUserProfile: builder.query({
      query: () => `users/me`,
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `users/me`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserOrders: builder.query({
      query: () => `orders/me`,
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => `orders/me/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    
    // Returns
    getMyReturns: builder.query({
      query: () => `returns/my`,
      providesTags: ["Return"],
    }),
    createReturn: builder.mutation({
      query: (data) => ({
        url: `returns`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Return", "Order"],
    }),
    
    getAddresses: builder.query({
      query: () => `users/addresses`,
      providesTags: ["Address"],
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: `users/addresses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),

    // -------------------------
    // 8. Farmers Endpoint
    // -------------------------
    getFarmers: builder.query({
      query: () => `farmers`,
    }),

    // -------------------------
    // 9. Contact Endpoint
    // -------------------------
    sendContactMessage: builder.mutation({
      query: (data) => ({
        url: `contact/`,
        method: "POST",
        body: data,
      }),
    }),

    // -------------------------
    // 10. Shipment Endpoint
    // -------------------------
    getShipmentByOrderId: builder.query({
      query: (orderId) => `shipping/shipments/order/${orderId}`,
      providesTags: (result, error, id) => [{ type: "Shipment", id }],
    }),
  }),
});

export const {
  // Catalog
  useGetCategoriesQuery,
  useGetBrandsQuery,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  // Reviews
  useGetProductReviewsQuery,
  useAddReviewMutation,
  // Cart
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  // Wishlist
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  // Checkout
  useGetShippingZonesQuery,
  useGetShippingMethodsQuery,
  useLazyApplyCouponQuery, // usually triggered manually
  usePlaceOrderMutation,
  useProcessPaymentMutation,
  useInitSSLCommerzPaymentMutation,
  // Auth
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useSendCheckoutOtpMutation,
  useVerifyCheckoutOtpMutation,
  // Profile
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useGetMyReturnsQuery,
  useCreateReturnMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  // Farmers
  useGetFarmersQuery,
  // Contact
  useSendContactMessageMutation,
  // Shipments
  useGetShipmentByOrderIdQuery,
} = ecommerceApi;
