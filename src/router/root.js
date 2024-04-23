import React from "react";
import { Suspense, lazy } from "react";
import productsRouter from "./productsRouter";
import couponRouter from "./couponRouter";
import memberRouter from "./memberRouter";
import TotalOrderRouter from "./totalOrderRouter";
import cartRouter from "./cartRouter";
import storeRouter from "./storeRouter";


const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"))
const CouponsIndex = lazy(()=> import("../pages/coupons/IndexPage"))
const TotalOrderIndex= lazy(() => import("../pages/payments/TotalOrderPage"))
const PaymentIndex = lazy(()=> import("../pages/payments/PaymentPage"))
const PaymentFailIndex = lazy( () => import("../pages/payments/PaymentFailPage") )
const PaymentSuccessIndex = lazy(()=>import("../pages/payments/PaymentSuccessPage"))
const PaymentPageIndex = lazy(()=>import("../pages/payments/PaymentsPage"))
const PaymentDataIndex = lazy(()=>import("../pages/payments/PaymentDataPage"))
const TotalOrdersIndex = lazy(()=> import("../pages/payments/TotalOrdersPage"))
const TotalOrderDetailIndex = lazy(()=> import("../pages/payments/TotalOrderDetailPage"))
const CartsIndex = lazy(()=> import("../pages/cart/CartIndexPage"))
const StoreIndex = lazy(()=> import("../pages/store/StoreIndexPage"))
const CouponAddIndex = lazy(()=>
import("../pages/coupons/AddPage"))

const root = createBrowserRouter([
  {
    path: "",
    element: <Suspense fallback={Loading}><ProductsIndex/></Suspense>,
    children: productsRouter()
  },
  {
    path: "products",
    element: <Suspense fallback={Loading}><ProductsIndex/></Suspense>,
    children: productsRouter()
  },
  {
  path:"coupons",
    element:<Suspense fallback={Loading}><CouponsIndex/></Suspense>,
    children: couponRouter()
  },
  {
    path:"carts",
      element:<Suspense fallback={Loading}><CartsIndex/></Suspense>,
      children: cartRouter()
    },
  {
    path:"store",
    element:<Suspense fallback={Loading}><StoreIndex/></Suspense>,
    children: storeRouter()
  },  
  {
    path: "member",
    children: memberRouter()
  },
  {
    path:"totalOrder",
    element:<Suspense fallback={Loading}><TotalOrderIndex/></Suspense>,
    children: TotalOrderRouter()
  },{
  path:"payment",
    element:<Suspense fallback={Loading}><PaymentIndex/></Suspense>
  },{
  path:"payment/fail",
    element:<Suspense fallback={Loading}><PaymentFailIndex/></Suspense>
  },{
    path:"payment/success",
    element:<Suspense fallback={Loading}><PaymentSuccessIndex/></Suspense>
  },{
    path:"payments",
    element:<Suspense fallback={Loading}><PaymentPageIndex/></Suspense>
  }, {
    path: "payments/:paymentId", // 동적 결제 ID를 받아오는 라우트
    element: <Suspense fallback={Loading}><PaymentDataIndex /></Suspense>
  },{
    path:"totalOrders",
    element:<Suspense fallback={Loading}><TotalOrdersIndex/></Suspense>
  }, {
    path: "totalOrders/:totalOrderId", // 동적 결제 ID를 받아오는 라우트
    element: <Suspense fallback={Loading}><TotalOrderDetailIndex /></Suspense>
  },{
    path:"addCoupons",
    element:<Suspense fallback={Loading}><CouponAddIndex/></Suspense>
  }
]);
export default root;
