import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { setShoppingcart,togglecomplete,clearshoppingcart} from "../redux/slices/shoppingslice";
import useApi from "../customehooks/useapi";
function Viewshopping() {
  const {request}=useApi();
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
        console.log(response.Getshoppinglist)
        dispatch(setShoppingcart(response.Getshoppinglist))
      }
      catch(err){
        console.log(err.message)
      }
    }
    datafetch()
  },[])
   
   const toggleshopping=(index)=>{
       dispatch(togglecomplete(index))
  }

 const handlecomplete=async()=>{

    const Shoppedlist=shoppingitems.filter((items)=>items.completed===true)
    console.log(Shoppedlist)
     try{
        const response=await request({
          url:"/shopping/createhistory",
          method:"post",
          data:Shoppedlist
        })

        const deleteshoppinglist = await request({
          url:"/shopping/deleteshoppinglist",
          method:"post",
          data:Shoppedlist
        })  
        console.log(deleteshoppinglist) 
        console.log(response)
        dispatch(clearshoppingcart())
     }
     catch(err){
         console.log(err.message)
     }
  }
  
return (
  <>
    <div className="min-h-screen bg-green-50 py-10 px-6">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-900">
          Shopping List
        </h1>
        <button
          onClick={() => {navigate("/shopping/shoppinghistory"),localStorage.setItem("currentpage","shoppinghistory")}}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow transition"
        >
          View History
        </button>
      </div>

      {/* Table Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="px-6 py-4 text-left text-green-900 font-semibold">
                #
              </th>
              <th className="px-6 py-4 text-left text-green-900 font-semibold">
                Product
              </th>
              <th className="px-6 py-4 text-left text-green-900 font-semibold">
                Quantity
              </th>
              <th className="px-6 py-4 text-center text-green-900 font-semibold">
                Done
              </th>
            </tr>
          </thead>

          <tbody>
            {shoppingitems.length > 0 ? (
              shoppingitems.map((items, index) => (
                <tr
                  key={index}
                  className={`border-b last:border-none transition ${
                    items.completed
                      ? "bg-green-50 text-green-400 line-through"
                      : "hover:bg-green-50"
                  }`}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">
                    {items.productname}
                  </td>
                  <td className="px-6 py-4">{items.quantity}</td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={items.completed}
                      onChange={() => toggleshopping(index)}
                      className="w-5 h-5 accent-green-700 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-green-600 font-medium"
                >
                  No items to shop 🌱
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Complete Button */}
      {shoppingitems.length > 0 && (
        <div className="max-w-5xl mx-auto mt-6 text-center">
          <button
            onClick={handlecomplete}
            className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-xl shadow-lg transition"
          >
            Complete Selected
          </button>
        </div>
      )}
    </div>
  </>
);
}
export default Viewshopping;
