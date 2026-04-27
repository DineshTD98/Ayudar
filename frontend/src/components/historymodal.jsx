function Historymodal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Card */}
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-xl rounded-[40px] shadow-3xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-8 py-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10 rotate-3">
              <svg className="w-6 h-6 text-emerald-400 -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Shopping Details</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{data.date}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="overflow-hidden rounded-[24px] border border-white/5">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.items.map((item, index) => (
                  <tr key={index} className="group hover:bg-white/5 transition-all">
                    <td className="px-6 py-5">
                      <span className="font-bold text-white tracking-wide">{item.productname}</span>
                    </td>
                    <td className="px-6 py-5 text-right font-black text-emerald-400 tabular-nums">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historymodal;