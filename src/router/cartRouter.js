import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading....</div>;
const Cart = lazy(() => import("../pages/cart/OrderCartPage"));


const cartRouter = () => {
  return [
    {
        path: "list",
        element: <Suspense fallback={Loading}><Cart/></Suspense>
      },
      {
        path: "",
        element: <Navigate replace to="/carts/list" />
      },
  ];
};

export default cartRouter;


  