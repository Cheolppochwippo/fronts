import { useParams } from "react-router-dom";
import ReadComponent from "../../components/store/StoreReadComponent";

const ReadPage = () => {
  const { productId } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">제품 상세 페이지</div>
      <ReadComponent productId={productId}></ReadComponent>
    </div>
  );
};

export default ReadPage;