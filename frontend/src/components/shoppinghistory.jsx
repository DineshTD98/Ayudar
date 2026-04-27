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
    <div className="min-h-screen text-slate-200 p-6 pt-32">
      <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3">
              <svg className="w-8 h-8 text-white -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">Shopping <span className="text-blue-400">History</span></h1>
              <p className="text-slate-400 mt-1 font-medium">Review your past completed family lists</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/shopping/viewshopping")}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all border border-white/10 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
            Back to Lists
          </button>
        </div>

        {/* History Table */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-xs font-black text-white/40 uppercase tracking-[0.2em]">Summary</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-white/40 uppercase tracking-[0.2em]">Completed Date</th>
                  <th className="px-6 py-4 text-center text-xs font-black text-white/40 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.length > 0 ? (
                  history.map((prod, index) => (
                    <tr key={index} className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-lg">
                            {prod.items[0].productname} <span className="text-white/40">& {prod.items.length - 1} more</span>
                          </span>
                          <span className="text-xs font-black text-blue-400 uppercase tracking-widest mt-1">
                            {prod.items.length} total items
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-400 font-medium">
                        {prod.date}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleview(prod)}
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-20 text-center">
                       <div className="flex flex-col items-center gap-4 opacity-20">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-xl font-bold italic">No shopping history yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <Historymodal data={selectedHistory} onClose={modalclose} />
      )}
    </div>
  );
}

export default Shoppinghistory;
