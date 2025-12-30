import Historymodal from "./historymodal";
import { useEffect, useState } from "react";
import useApi from "../customehooks/useapi";
import { useNavigate } from "react-router-dom";
function Shoppinghistory() {
   const navigate=useNavigate()
   const {request}=useApi()
   const [history,setHistory]=useState('')
   const [open,setOpen]=useState(false);
   const [selectedHistory, setSelectedHistory] = useState(null);

  useEffect(()=>{
     async function fetchhistory(){
        try{
           const response=await request({
              url:"/history/gethistory",
              method:"GET",
            })
            setHistory(response.historyitems)
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
    <div>
        <div>
          <div className=" text-right mt-5">
            <button
              type="button"
              onClick={() =>{navigate('/shopping/viewshopping'),localStorage.setItem("currentpage","viewshopping")}}
              className="border border-green-800 mr-14 bg-red-600 p-1 text-white rounded"
            >
              back
            </button>
          </div>
          <div>
             <table>
                  <thead>
                      <tr>
                        <th>Summary</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {history > 0 && history.map((prod, index) => (
                          <tr key={index}>
                            <td className="border border-black text-center">
                              {prod.items[0].Productname} & more ({prod.items.length} items)
                            </td>

                            <td className="border border-black text-center">
                              {prod.date}
                            </td>

                            <td className="border border-black text-center">
                              <button
                                onClick={() => handleview(prod)}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
             </table>
          </div>
        </div>
       {open &&
        <div>
            <Historymodal data={selectedHistory} onClose={modalclose}/>
        </div>
       }
     </div>
  )
}

export default Shoppinghistory;
