import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/api/` }),
  endpoints: (builder) => ({
    getproductByName: builder.query({
      query: (name) => `${name}`,
    }),
    addProductByAdmin: builder.mutation({
      query: (formData) => ({
        url: "/admin/create_product",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetproductByNameQuery, useAddProductByAdminMutation } =
  productApi;
