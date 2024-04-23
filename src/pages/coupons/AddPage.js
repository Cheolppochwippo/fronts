import AddComponent from "../../components/coupon/AddComponent";
import BasicLayout from "../../layouts/BasicLayout";

const AddPage = () => {
  return (
  <BasicLayout>
    <div className="text-black font-extrabold -mt-10 mt-4">
      쿠폰 작성
    </div>
    <div className="w-full flex m-2 p-2 ">

    </div>
    <div className="flex flex-wrap w-full ">
      <AddComponent/>
    </div>
  </BasicLayout>
  );
};

export default AddPage;
