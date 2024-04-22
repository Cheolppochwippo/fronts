import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ProductsList = lazy(() => import("../pages/products/ListPage"));
const ProductRead = lazy(() => import("../pages/products/ReadPage"));

const productsRouter = () => {
  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><ProductsList /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="/products/list" />
    },
    {
      path: "read/:productId",
      element: <Suspense fallback={Loading}><ProductRead /></Suspense>
    }
  ];
};

export default productsRouter;