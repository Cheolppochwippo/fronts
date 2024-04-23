import AddComponent from "../../components/coupon/AddComponent";
import BasicLayout from "../../layouts/BasicLayout";

const AddPage = () => {
  return (
      <BasicLayout>
        <div
            className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
          <div
              className="w-full flex flex-wrap h-full justify-center items-center border-2">
            <AddComponent/>
          </div>
        </div>
      </BasicLayout>
  );
};

export default AddPage;
