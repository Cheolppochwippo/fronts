import ListComponent from "../../components/store/StoreListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상점 상품</div>
      <ListComponent />
    </div>
  );
};

export default ListPage;
