import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<any, void>({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query:(id:string) => ({
                url: PRODUCTS_URL + `/${id}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        })
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;