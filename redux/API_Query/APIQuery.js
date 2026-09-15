import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "@/redux/API_Slices/AuthSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Access tokens expire after 30 minutes. Any request that comes back 401 triggers a
// silent refresh via the stored refresh token, then retries once. Concurrent 401s
// share a single in-flight refresh instead of racing multiple calls.
let refreshPromise = null;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = api.getState().auth?.refreshToken;

    if (refreshToken) {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshResult = await rawBaseQuery(
            { url: "auth/refresh", method: "POST", body: { refresh_token: refreshToken } },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            const data = refreshResult.data;
            api.dispatch(setCredentials({
              token: data.access_token,
              refreshToken: data.refresh_token,
            }));
            return data.access_token;
          }
          api.dispatch(logout());
          return null;
        })().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;
      if (newToken) {
        result = await rawBaseQuery(args, api, extraOptions);
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// Base API slice with re-auth, tag types, and a country lookup endpoint.
// All other endpoints are injected via ecommerceApi.js using injectEndpoints.
export const API_Query = createApi({
  reducerPath: "API_Query",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart", "Wishlist", "Product", "User", "Order", "Address", "Review", "Return"],
  endpoints: (builder) => ({
    getCountryByName: builder.query({
      query: (name) => `location_country/?search=${name}`,
      transformResponse(baseQueryReturnValue) {
        const data = baseQueryReturnValue?.results;
        return data?.map((item) => ({
          value: item?.name,
          label: item?.name,
          code: item?.code,
          id: item?.id,
        }));
      },
    }),
  }),
});

export const {
  useGetCountryByNameQuery,
} = API_Query;
