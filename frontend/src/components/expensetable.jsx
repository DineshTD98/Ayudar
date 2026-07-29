function Expensetable({expense = [], categories = []}) {

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