import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";

import ServerError from "../../errors/ServerError";
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
{
    path:'/',
    element:<App/>,
    children:[
        {element:<RequireAuth/>, children:[
        {path:'checkout',element:<CheckoutPage/>}
        
        ]},
 {path:'',element:<HomePage/>},
 {path:'catalog',element:<Catalog/>},
 {path:'catalog/:id',element:<ProductDetails/>},
 {path:'about',element:<AboutPage/>},
  {path:'contact',element:<ContactPage/>},
 {path:'server-error',element:<ServerError/>},
 {path:'not-found',element:<NotFound/>},
 {path:'login',element:<LoginForm/>},
{path:'*',element: <Navigate replace to = '/not-found'/>},
{path:'basket',element:<BasketPage/>},

{path:'register',element:<RegisterForm/>}


    ]
}

], {
    future:{
    v7_relativeSlatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
}

})