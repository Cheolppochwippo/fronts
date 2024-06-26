import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";
import  StoreInfoComponent  from "../../components/store/StoreInfoComponent"

const StoreIndexPage = () => {

  const navigate = useNavigate()

  const handleClickList = useCallback(() => {
    navigate({ pathname:'list' })
  })

  const handleClickAdd = useCallback(() => {
    navigate({ pathname:'add' })
  })

  const handleClickUpdate = useCallback(() => {
    navigate({ pathname:'update' })
  })
  const handleClickhistory = useCallback(() => {
    navigate({ pathname:'history' })
  })

  return ( 
    <BasicLayout>
      <div className="text-black font-extrabold -mt-10">
          Store Menus
      </div>

      <div className="w-full flex m-2 p-2 ">
        <div
            className="text-xl m-1 p-2  w-20 font-extrabold text-center underline"
            onClick={handleClickList}>
          LIST
        </div>

        <div
            className="text-xl m-1 p-2 w-20 font-extrabold  text-center underline"
            onClick={handleClickAdd}>
          ADD
        </div>
        <div
            className="text-xl m-1 p-2 w-20 font-extrabold  text-center underline"
            onClick={handleClickUpdate}>
          UPDATE
        </div>
        <div
            className="text-xl m-1 p-2 w-20 font-extrabold  text-center underline"
            onClick={handleClickhistory}>
           상점 주문 내역
        </div>
        <div>
          <StoreInfoComponent/>
        </div>

      </div>
      <div className="flex flex-wrap w-full ">
        <Outlet/>
      </div>
    </BasicLayout>
  );
}

export default StoreIndexPage;
