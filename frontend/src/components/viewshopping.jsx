import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { setShoppingcart,togglecomplete,clearshoppingcart} from "../redux/slices/shoppingslice";

function Viewshopping() {
  
  const navigate=useNavigate();
  const shoppingitems=useSelector((state)=>state.Shoppingcart.value)
  const dispatch=useDispatch()

  useEffect(()=>{
    async function datafetch(){
      try{
        const response=await request({
          url:"/shopping/getshopping",
          method:'GET'
        })
        dispatch(setShoppingcart(response.Getshoppinglist))
      }
      catch(err){
        console.log(err.message)
      }
    }
    datafetch()
  },[])
   
   const togglecomplete=(index)=>{
       dispatch(togglecomplete(index))
  }

 const handlecomplete=async()=>{

    const Shoppedlist=shoppingitems.filter((items)=>items.completed===true)
     try{
        const response=await request({
          url:"/shopping/createhistory",
          post:"post",
          data:Shoppedlist
        })
        console.log(response)
        dispatch(clearshoppingcart())
     }
     catch(err){
         console.log(err.message)
     }
  }
  
return (
    <>
     
        <div>
          <div className="text-right mt-5 mr-10">
            <button
              className="border border-black bg-green-300 text-black p-1 rounded"
              onClick={() => navigate('/shopping/shoppinghistory')}
            >
              History
            </button>
          </div>
          <div className="mt-6 w-[800px] ms-80 overflow-x-auto">
            <h1 className="text-center text-[22px] font-bold mb-5">
              Shopping List
            </h1>
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 font-semibold text-center">
                    Slno
                  </th>
                  <th className="border px-4 py-2 font-semibold text-center">
                    Productname
                  </th>
                  <th className="border px-4 py-2 font-semibold text-center">
                    Quantity
                  </th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {shoppingitems.length > 0 &&
                  shoppingitems.map((items) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 text-center ${items.completed ? "opacity-60 blur-[1px]" : ""}`}
                    >
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{items.Productname}</td>
                      <td className="border px-4 py-2">{items.Quantity}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          onChange={() => togglecomplete(index)}
                        />
                      </td>
                    </tr>
                  ))}
                {shoppingitems.length == 0 && (
                  <tr>
                    <td colSpan={3} className="text-center p-2">
                      No item to shop
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {shoppingitems.length > 0 && (
              <div className="text-center mt-5">
                <button
                  onClick={() => handlecomplete()}
                  className="border border-green-800 p-1 bg-green-800 text-white rounded"
                >
                  Complete
                </button>
              </div>
            )}
          </div>
        </div>
      
    </>
  );
}
export default Viewshopping;
