import useApi from "../customehooks/useapi";
import { useDispatch } from "react-redux";
import { removeExpense } from "../redux/slices/expenseslice";
import { toast } from "react-hot-toast";

function Expensetable({expense = [], categories = []}) {
  const { request } = useApi();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await request({ url: `/budget/deleteexpense/${id}`, method: "DELETE" });
      dispatch(removeExpense(id));
      toast.success("Expense deleted successfully");
    } catch (err) {
      toast.error("Failed to delete expense");
      console.error(err);
    }
  };

  return (
    <>
    <div className="space-y-6">
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] rounded-[32px] border border-white/5 scrollbar-hide">
        <table className="min-w-full">
          <thead className="bg-[#1e2335]/95 backdrop-blur-md sticky top-0 z-10 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Descriptor</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Classification</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {expense.map((exp) => (
              <tr key={exp._id} className="group hover:bg-white/5 transition-all">
                <td className="px-6 py-5">
                  <span className="font-bold text-white tracking-wide">{exp.title}</span>
                </td>
                <td className="px-6 py-5 font-black text-emerald-400 tabular-nums">
                  ₹{Number(exp.amount).toLocaleString()}
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {typeof exp.category === 'object' 
                      ? exp.category?.name 
                      : (categories.find(c => c._id === exp.category)?.name || "others")
                    }
                  </span>
                </td>
                <td className="px-6 py-5 text-slate-500 text-sm font-medium">
                  {new Date(exp.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                    title="Delete Expense"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {expense.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-16 text-center text-slate-600 italic font-medium">
                  No expense records match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>   
     </>
  )
}

export default Expensetable