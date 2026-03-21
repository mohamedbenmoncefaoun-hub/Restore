import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../models/product";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import type { ProductParams } from "../../models/productParams";
import { filterEmptyValues } from "../../../lib/util";
import type { Pagination } from "../../models/pagination";

export const catalogApi = createApi({
    reducerPath:'catalogApi',
    baseQuery:baseQueryWithErrorHandling ,
    endpoints:(builder)=>({
        fetchProducts: builder.query<{items:Product[], pagination: Pagination},ProductParams>({
            query:(productParams)=>{

                    return {
                url:'product',
                params: filterEmptyValues(productParams)
                    }
            },
            transformResponse:(items:Product[],meta)=>{
                const paginationHeader = meta?.response?.headers.get('Pagination');
                const pagination = paginationHeader ? JSON.parse(paginationHeader): null;
                return {items, pagination}
            }
        }),
        fetchProductDetails: builder.query<Product,number>({
            query:(productId)=>`product/${productId}`
        }),
        fetchFilters: builder.query<{brands:string[], types: string[]}, void>({
            query: ()=>'product/filters'
        })
    })
});
export const{useFetchProductDetailsQuery, useFetchProductsQuery,useFetchFiltersQuery}= catalogApi;