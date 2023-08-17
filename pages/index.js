import { useState, useEffect } from "react";

// on each page data
const pageSize = 10;

function HomePage() {
  const [data, setData] = useState([]);
  const [presentPage, setPresentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(presentPage);
  }, [presentPage]);

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${pageSize}` //API CALL
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const records = await response.json();
      setData(records);

      const totalApiData = response.headers.get("x-total-count");
      //get total pages here pageSize=10 then 100/10=10 total pages
      const totalPages = Math.ceil(totalApiData / pageSize); //round up val
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Error while fetching data", error);
    }
  };

  const handleNextPage = () => {
    if (presentPage < totalPages) {
      setPresentPage(presentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (presentPage > 1) {
      setPresentPage(presentPage - 1);
    }
  };

  return (
    <>
      <div>
        <h1> DATA GRID</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((image) => {
              return (
                <tr key={image.id}>
                  <td>{image.id}</td>
                  <td>{image.title}</td>
                  <td>
                    <img src={image.thumbnailUrl} alt={image.title} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button onClick={handlePreviousPage} disabled={presentPage === 1}>
            previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={presentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
