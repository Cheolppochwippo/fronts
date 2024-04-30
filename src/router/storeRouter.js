import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ProductsList = lazy(() => import("../pages/store/ListPage"));
const ProductRead = lazy(() => import("../pages/store/ReadPage"));
const ProductAdd = lazy(() => import("../pages/store/AddPage"));
const ProductModify = lazy(() => import("../pages/store/ModifyPage"));
const OrderHistory = lazy(() => import("../pages/store/HistoryPage"));
const StoreUpdate = lazy(() => import("../pages/store/UpdatePage"));
const storeRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/store/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ProductAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:productId",
      element: (
        <Suspense fallback={Loading}>
          <ProductRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:productId",
      element: (
        <Suspense fallback={Loading}>
          <ProductModify />
        </Suspense>
      ),
    },
    {
      path: "update",
      element: (
        <Suspense fallback={Loading}>
          <StoreUpdate />
        </Suspense>
      ),
    },
    {
      path: "history",
      element: (
        <Suspense fallback={Loading}>
          <OrderHistory />
        </Suspense>
      ),
    },
  ];
};

export default storeRouter;
