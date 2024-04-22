import {useSearchParams}  from 'react-router-dom'

const PageComponent = ({ serverData, movePage }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const handleClickPrev = () => {
    const currentPage = Number(searchParams.get('page')) || 1
    const prevPage = currentPage - 1;

    if (prevPage === 0) return;

    setSearchParams({page: prevPage, size: 10})
  }

  const handleClickNext = () => {
    const currentPage = Number(searchParams.get('page')) || 1
    const nextPage = currentPage + 1;

    setSearchParams({page: nextPage, size: 10})
  }


    return (
      <div className="m-6 flex justify-center">
        <div
            className="m-2 p-2 w-16 text-center font-bold text-blue-400"
            onClick={handleClickPrev}
          >
            Prev
          </div>
          <div className="mx-4"></div>
          <div
            className="m-2 p-2 w-16 text-center font-bold text-blue-400"
            
            onClick={handleClickNext}
          >
            Next
          </div>
      </div>
    );
  };
  
  export default PageComponent;

  
  // {Array.from({ length: serverData.totalPages }, (_, i) => (
  //   <div
  //     key={i}
  //     className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${
  //       serverData.number === i ? 'bg-gray-500' : 'bg-blue-400'
  //     }`}
  //     onClick={() => movePage({ page: i, size: serverData.size })}
  //   >
  //     {i + 1}
  //   </div>
  // ))}