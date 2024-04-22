import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {

  return (
      <BasicLayout>
        <div className="text-black font-extrabold -mt-10 mt-4">
          발급 가능한 쿠폰
        </div>
        <div className="w-full flex m-2 p-2 ">

        </div>
        <div className="flex flex-wrap w-full ">
          <Outlet/>
        </div>
      </BasicLayout>
  );
}

export default IndexPage;
