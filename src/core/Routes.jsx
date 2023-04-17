import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductPage from "../pages/Product/ProductPage";
import BookPage from "../pages/BookPage/BookPage";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import ProductByCategory from "../pages/ProductByCategory/ProductByCategory";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Home />,
   },
   {  
      basename:"/login/",
      key: "login",
      path: '/login',
      element: <Login />,
   },
   {
      basename: "/register/",
      key: "register",
      path: '/register',
      element: <Register />,
   },
   {
      path:'/bookPage/:id',
      element:<BookPage/>
   },
   {
      path: '/product/:id',
      element: <ProductPage/>
   },
   {
      path:'/createProduct',
      key:'createproduct',
      element:<CreateProduct/>
   },
   {
      path:'/category/:id',
      key:'category',
      element:<ProductByCategory/>
   },
]);

export { router };