import Historymodal from "./historymodal";
import { useEffect, useState } from "react";
import useApi from "../customehooks/useapi";
import { useNavigate } from "react-router-dom";
function Shoppinghistory() {
   const navigate=useNavigate()
   const {request}=useApi()
   const [history,setHistory]=useState([])
   const [open,setOpen]=useState(false);
   const [selectedHistory, setSelectedHistory] = useState(null);

   const modalclose = () => setOpen(false);

  useEffect(()=>{
     async function fetchhistory(){
        try{
           const response=await request({
              url: "/shopping/gethistory",
              method:"GET",
            })
            
            // Group items by date
            const grouped = response.historyproducts.reduce((acc, item) => {
                const date = new Date(item.completedDate).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(item);
                return acc;
            }, {});

            const formattedHistory = Object.keys(grouped).map(date => ({
                date,
                items: grouped[date]
            }));

            setHistory(formattedHistory)
        }
        catch(err){
          console.log(err.message)
        }
     }
     fetchhistory()
  },[])


  const handleview=(historyitems)=>{
     setOpen(true);
     setSelectedHistory(historyitems)
  }
  
  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-green-900">
        Shopping History
      </h1>

      <button
        onClick={() => {
          localStorage.setItem("currentpage", "viewshopping");
          navigate("/shopping/viewshopping");
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
      >
        Back
      </button>
    </div>

    {/* Table Card */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-green-100">
          <tr>
            <th className="px-6 py-4 text-left text-green-900 font-semibold">
              Summary
            </th>
            <th className="px-6 py-4 text-left text-green-900 font-semibold">
              Date
            </th>
            <th className="px-6 py-4 text-center text-green-900 font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {history.length > 0 ? (
            history.map((prod, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-green-50 transition"
              >
                <td className="px-6 py-4 font-medium text-green-800">
                  {prod.items[0].productname} & more
                  <span className="ml-2 text-sm text-green-600">
                    ({prod.items.length} items)
                  </span>
                </td>

                <td className="px-6 py-4 text-green-700">
                  {prod.date}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleview(prod)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="text-center py-12 text-green-700 font-medium"
              >
                No shopping history found 🛒
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* MODAL */}
  {open && (
    <Historymodal data={selectedHistory} onClose={modalclose} />
  )}
</div>
  )
}

export default Shoppinghistory;
