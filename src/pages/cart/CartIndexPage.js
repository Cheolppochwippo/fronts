import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {

  return (
      <BasicLayout>
      
        {/* <div className="flex flex-wrap w-full "> */}
          <Outlet/>
        {/* </div> */}
      </BasicLayout>
  );
}

export default IndexPage;
