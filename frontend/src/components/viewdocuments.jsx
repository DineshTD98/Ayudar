import { useSelector, useDispatch } from "react-redux";
import { setDocument } from "../redux/slices/documentslice";
import useapi from "../customehooks/useapi";
import { useOutletContext } from "react-router-dom";
import { useEffect,useState } from "react";
import Search from "../assets/search-icon.jpg";


function Viewdocuments() {

  const BASE_URL=import.meta.env.VITE_API_URL;
  const { reload, setReload } = useOutletContext();
  const { request, error, loading } = useapi();

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const Documentlist = useSelector((state) => state.Documentlist.value);

  //fetching document from backend

   useEffect(() => {
    async function documentfetch() {
      try {
        const response = await request({
          url: "/documents/getdocument",
          method: "GET",
        });
        console.log(response);
        if (Array.isArray(response.document)) {
          dispatch(setDocument(response.document));
          console.log(response);
          setReload(false);
        } else {
          dispatch(setDocument([]));
          setReload(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    documentfetch();
  }, [reload]);

  const handledelete = async (id) => {
    const confirmdelete = window.confirm("Are you sure you want to delete this document?");
    if (!confirmdelete) return;
    try {
      const response = await request({
        url: `/documents/deletedocument/${id}`,
        method: "delete",
      });
      const updatedlist = Documentlist.filter(
        (data) => data._id !== response.deletedid,
      );
      dispatch(setDocument(updatedlist));
    } catch (err) {
      console.log(err.message);
    }
  };
  const handledownload = (fileUrl, filename) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename || "document.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // handle search 
  const handleSearch = async(e) => {
    e.preventDefault();
    try{
        const respose=await request({
          url:`/documents/searchdocument/${search}`,
          method:"GET",
         })
         console.log(respose.document)
         if(Array.isArray(respose.document)){
          dispatch(setDocument(respose.document))
         }
      }
    catch(err){
      console.log(err.message);
    }
       
  }


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex">
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold text-right text-green-700 mb-6">
            Manage Documents
          </h1>
        </div>
        <div className="w-1/2 flex justify-end mb-5">
          <form action="" onSubmit={handleSearch}>
            <div className="relative w-[400px] flex ">
            {/* Input */}
            <label htmlFor="search" className="block p-3">
              Search By category
            </label>
            <input
              type="search"
              placeholder="Load your file here"
              className="w-full border border-gray-300 p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Search Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
              <button type="submit">
                <img src={Search} alt="search" className="w-6 h-6 opacity-60" />
              </button>

              {/* Tooltip */}
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2
                      whitespace-nowrap rounded bg-black px-1 py-1
                      text-xs text-white opacity-0
                      group-hover:opacity-100 transition"
              >
                Search documents
              </span>
            </div>
            </div>
          </form>
        </div>
      </div>


      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-green-200 text-black sticky top-0 border border-black">
            <tr>
              <th className="px-4 py-3 text-sm font-medium border border-black">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium border border-black">
                Category
              </th>
              <th className="px-4 py-3 text-sm font-medium border border-black">
                Uploaded Date
              </th>
              <th className="px-4 py-3 text-sm font-medium border border-black">
                Preview
              </th>
              <th className="px-4 py-3 text-sm font-medium border border-black">
                Download
              </th>
              <th className="px-4 py-3 text-sm font-medium border border-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-center text-gray-700">
            {Documentlist.map((data) => (
              <tr
                key={data._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-4 py-3 font-medium">{data.name}</td>
                <td className="px-4 py-3">{data.category}</td>
                <td className="px-4 py-3">{data.date}</td>

                <td className="px-4 py-3">
                  {data.fileType === "application/pdf" ? (
                    <div className="w-20 h-24 mx-auto border rounded flex items-center justify-center bg-gray-100 text-red-500">
                      <span className="text-xs font-bold">PDF</span>
                    </div>
                  ) : (
                    <img
                      src={`${BASE_URL}/uploads/${data.fileUrl}`}
                      alt="document"
                      className="w-20 h-24 object-cover mx-auto rounded border"
                    />
                  )}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      handledownload(
                        `${BASE_URL}/uploads/${data.fileUrl}`,
                        data.name,
                      )
                    }
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Download
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handledelete(data._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Viewdocuments;
