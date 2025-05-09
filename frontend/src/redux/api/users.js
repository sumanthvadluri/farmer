import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { ADDCROP_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),

    getUserCrops: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/my-crop`,
        method: "GET",
      }),
    }),
    addContractCrops: builder.mutation({
      query: (data) => ({
        url: `${ADDCROP_URL}/contractcrops`,
        method: "POST",
        body: data,
      }),
    }),
    addRequestCrops: builder.mutation({
      query: (data) => ({
        url: `${ADDCROP_URL}/requestcrops`,
        method: "POST",
        body: data,
      }),
    }),
    addAcceptCrops: builder.mutation({
      query: (data) => ({
        url: `${ADDCROP_URL}/acceptcrops`,
        method: "POST",
        body: data,
      }),
    }),
    addPastCrops: builder.mutation({
      query: (data) => ({
        url: `${ADDCROP_URL}/pastcrops`,
        method: "POST",
        body: data,
      }),
    }),
    getAllCrops: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/all-crop`,
        method: "GET",
      }),
    }),
    getContracts: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/getmyContracts`,
        method: "GET",
      }),
    }),
    getRequestCrops: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/getrequestcrops`,
        method: "GET",
      }),
    }),

    getFarmerAcceptCrops: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/getfarmeracceptcrops`,
        method: "GET",
      }),
    }),

    getBuyerAcceptCrops: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/getbuyeracceptcrops`,
        method: "GET",
      }),
    }),

    getFarmerPastCrops: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/getfarmerpastcrops`,
        method: "GET",
      }),
    }),

    getBuyerPastCrops: builder.query({
      query: () => ({
        url: `${ADDCROP_URL}/getbuyerpastcrops`,
        method: "GET",
      }),
    }),

    deleteRequestCrop: builder.mutation({
      query: (id) => ({
        url: `${ADDCROP_URL}/requestcrops/${id}`,
        method: "DELETE",
      }),
    }),

    
    deleteAcceptCrop: builder.mutation({
      query: (id) => ({
        url: `${ADDCROP_URL}/acceptcrops/${id}`,
        method: "DELETE",
      }),
    }),
    deleteFromCrop: builder.mutation({
      query: (id) => ({
        url: `${ADDCROP_URL}/deletefromCrop/${id}`,
        method: "DELETE",
      }),
    }),

    editCrop: builder.mutation({
      query: ({ id, cropData }) => ({
        url: `${ADDCROP_URL}/editcrop/${id}`,
        method: "PUT",
        body: cropData,
      }),
    }),

    addCrop: builder.mutation({
      query: (formData) => ({
        url: `${ADDCROP_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetAllCropsQuery,
  useGetUserProfileQuery,
  useGetUserCropsQuery,
  useAddCropMutation,
  useAddContractCropsMutation,
  useAddAcceptCropsMutation,
  useAddPastCropsMutation,
  useAddRequestCropsMutation,
  useDeleteRequestCropMutation,
  useDeleteAcceptCropMutation,
  useDeleteFromCropMutation,
  useGetRequestCropsQuery,
  useGetFarmerAcceptCropsQuery,
  useGetBuyerAcceptCropsQuery,
  useGetContractsQuery,
  useGetFarmerPastCropsQuery,
  useGetBuyerPastCropsQuery,
  useEditCropMutation,
} = userApiSlice;


// profile: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),

    // getUsers: builder.query({
    //   query: () => ({
    //     url: USERS_URL,
    //   }),
    // }),