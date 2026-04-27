import { useEffect } from "react";
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
   
   const toggleshopping=(id)=>{
       dispatch(togglecomplete(id))
  }

 const handlecomplete=async()=>{

    const Shoppedlist=shoppingitems.filter((items)=>items.completed===true)
    console.log(Shoppedlist)
     try{
        const response=await request({
          url:"/shopping/completeshopping",
          method:"post",
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
    <div className="min-h-screen text-slate-200 p-6 pt-32">
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Shopping List</h1>
            <p className="text-slate-400 mt-1 font-medium">Items you need to pick up</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => { navigate("/shopping/shoppinghistory"); localStorage.setItem("currentpage", "shoppinghistory"); }}
              className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all text-sm"
            >
              History
            </button>
            <button
              onClick={() => navigate("/shopping/createshopping")}
              className="flex-1 sm:flex-none px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 shadow-2xl overflow-hidden">
          {shoppingitems.length > 0 ? (
            <div className="divide-y divide-white/5">
              {shoppingitems.map((items) => (
                <div
                  key={items._id}
                  className={`flex items-center gap-4 p-6 transition-all duration-300 ${
                    items.completed ? "bg-white/5 opacity-50" : "hover:bg-white/5"
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={items.completed}
                      onChange={() => toggleshopping(items._id)}
                      className="peer w-8 h-8 rounded-full bg-white/5 border-2 border-white/20 checked:bg-emerald-500 checked:border-emerald-500 appearance-none cursor-pointer transition-all"
                    />
                    <svg className="w-5 h-5 absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-lg font-bold text-white transition-all ${items.completed ? "line-through text-slate-500" : ""}`}>
                      {items.productname}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-black uppercase tracking-widest text-blue-400">{items.quantity}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="text-xs text-slate-500 font-bold">In cart</span>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Add delete item option here if needed */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🌱</span>
              </div>
              <p className="text-xl font-bold text-white">All items shopped!</p>
              <p className="text-slate-500 mt-2">Your list is currently empty.</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        {shoppingitems.length > 0 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handlecomplete}
              className="group relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-[24px] font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all active:scale-95"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Complete Shopping Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Viewshopping;
