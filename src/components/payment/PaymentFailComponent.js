import { useSearchParams } from "react-router-dom"
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";

export function FailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();

  const returnOrder =  () => {
    try {
      navigate({ pathname: "/totalOrder" }, { replace: true });
    } catch (error) {
      console.error("Error while adding order:", error);
    }
  }

  return (
      <div>
        <h1>결제 실패</h1>
        <div>{`사유: ${searchParams.get("message")}`}</div>
        <button
            className="rounded p-4 w-36 bg-blue-500 text-xl  text-white"
            onClick={returnOrder}
        >
          돌아가기
        </button>
      </div>
  )
}

export default FailPage;
