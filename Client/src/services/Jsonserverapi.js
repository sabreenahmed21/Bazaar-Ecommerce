import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentUser } from "../Redux/UserSlice";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_URL}/api/`,
  });
  const state = api.getState();
  const token = selectCurrentUser(state)?.token;

  if (typeof args === "string") {
    args = { url: args };
  }

  if (token) {
    args.headers = {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return baseQuery(args, api, extraOptions);
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    processPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/process",
        method: "POST",
        body: paymentData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: "orders",
        method: "GET",
      }),
    }),
    getproductByName: builder.query({
      query: (name) => `${name}`,
    }),
    fetchProductReviews: builder.query({
      query: ({productId, currentPage}) => ({
        url: `product/${productId}/reviews?page=${currentPage}`,
        method: "GET",
      }),
    }),
    addProductReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `product/${productId}/reviews`,
        method: "POST",
        body: review,
      }),
    }),
    deleteProductReview: builder.mutation({
      query: (reviewId) => ({
        url: `reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
    editProductReview: builder.mutation({
      query: ({ reviewId, review }) => ({
        url: `reviews/${reviewId}`,
        method: "PATCH",
        body: review,
      }),
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/signup",
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyCodePassword: builder.mutation({
      query: (verificationCode) => ({
        url: "/verifycode",
        method: "POST",
        body: { code: verificationCode },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyCodeEmail: builder.mutation({
      query: (data) => ({
        method: "GET",
        url: `/verify-email?verificationCode=${data.verificationCode}`,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, passwordConfirm, token }) => ({
        url: `/resetpassword/${token}`,
        method: "PATCH",
        body: { password, passwordConfirm },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forgetpassword",
        method: "POST",
        body: email,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteAccount: builder.mutation({
      query: (currentPassword) => ({
        url: '/delete-me',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentPassword.accessToken}`,
        },
        body: currentPassword,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/updatePassword',
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.accessToken}`,
        },
      }),
    }),
    updateUserData: builder.mutation({
      query: (formData) => ({
        url: "/updateUserData",
        method: "PATCH",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useProcessPaymentMutation,
  useGetOrdersQuery,
  useGetproductByNameQuery,
  useFetchProductReviewsQuery,
  useAddProductReviewMutation,
  useDeleteProductReviewMutation,
  useEditProductReviewMutation,
  useSignInMutation,
  useSignUpMutation,
  useVerifyCodePasswordMutation,
  useVerifyCodeEmailMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
  useDeleteAccountMutation ,
  useUpdatePasswordMutation ,
  useUpdateUserDataMutation,
  useLogoutMutation,
} = productApi;
