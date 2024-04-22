import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>
const CouponList = lazy(()=>import("../pages/coupons/ListPage"))

const CouponsRouter = () => {

  return [
    {
      path: "list",
      element: <Suspense fallback={Loading}><CouponList/></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="/coupons/list"/>
    }

  ]
}

export default CouponsRouter;

