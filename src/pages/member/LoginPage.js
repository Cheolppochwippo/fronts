import LoginComponent from "../../components/member/LoginComponent";
import BasicMenu from "../../menus/BasicMenu";

const LoginPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />
      <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
        <div className="max-w-xl w-full px-4">
          {/* 여기에 LoginComponent를 포함하고, 크기 및 스타일을 조정할 수 있습니다 */}
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
