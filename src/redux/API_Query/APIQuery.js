import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints

export const API_Query = createApi({
  reducerPath: "API_Query",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    getCountryByName: builder.query({
      query: (name) => `location_country/?search=${name}`,
      transformResponse(baseQueryReturnValue, meta, arg) {
        const data = baseQueryReturnValue?.results;
        const customData = data?.map((item) => {
          return {
            value: item?.name,
            label: item?.name,
            code: item?.code,
            id: item?.id,
          };
        });
        return customData;
      },
    }),
    // getStateByName: builder.query({
    //   query: (countryId) => `location_state/?country_id=${countryId}`,
    //   transformResponse(baseQueryReturnValue, meta, arg) {
    //     const data = baseQueryReturnValue.results;
    //     const customData = data?.map((item) => {
    //       return {
    //         value: item?.name,
    //         label: item?.name,
    //         state_code: item?.state_code,
    //         id: item?.id,
    //         country_code: item?.country_code,
    //         country_id: item?.country_id,
    //       };
    //     });
    //     return customData;
    //   },
    // }),
    // getCityByName: builder.query({
    //   query: (country_id, state_id) =>
    //     `location_city/?country_id=${country_id}&state_id=${state_id}`,
    //   transformResponse(baseQueryReturnValue, meta, arg) {
    //     const data = baseQueryReturnValue.results;
    //     const customData = data?.map((item) => {
    //       return {
    //         value: item?.name,
    //         label: item?.name,
    //         state_code: item?.state_code,
    //         id: item?.id,
    //         country_code: item?.country_code,
    //         country_id: item?.country_id,
    //       };
    //     });
    //     return customData;
    //   },
    // }),

    // getLearnerProfile: builder.query({
    //   query: () => ({
    //     url: `learner-profile/`,
    //     method: "GET",
    //     headers,
    //   }),
    //   transformResponse(baseQueryReturnValue, meta, arg) {
    //     const data = baseQueryReturnValue.results;
    //
    //     return data;
    //   },
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // useGetLearnerProfileQuery,
  useGetCountryByNameQuery,
} = API_Query;
