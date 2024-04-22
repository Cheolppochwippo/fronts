import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/store/ModifyComponent";

const ModifyPage = () => {
    const { productId } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상품 수정</div>
      <ModifyComponent productId={productId}/>
    </div>
  );
};
export default ModifyPage;
