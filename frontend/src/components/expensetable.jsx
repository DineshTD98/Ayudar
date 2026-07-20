import { useState, useMemo, useEffect } from "react";
import useapi from "../customehooks/useapi";

function Expensetable({expense = []}) {
  const { request } = useapi();
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [categories, setCategories] = useState([]);

  // Fetch categories for the filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request({
          url: "/budget/categories",
          method: "get",
        });
        setCategories(res?.categories || []);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();
  }, [request]);

  const filteredExpenses = useMemo(() => {
    return expense.filter((item) => {
      // Handle both populated (object) and non-populated (string) category
      const itemCategoryId = item.category?._id || item.category;
      const categoryMatch = filterCategory === "All" || itemCategoryId === filterCategory;
      
      const itemDate = item.date ? new Date(item.date) : null;
      const itemMonth = itemDate ? itemDate.getMonth() : -1;
      const monthMatch = filterMonth === "All" || itemMonth === Number(filterMonth);
      
      return categoryMatch && monthMatch;
    });
  }, [expense, filterCategory, filterMonth]);

  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px]">
        <div className="flex items-center gap-3 px-4">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</span>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent font-bold text-white outline-none cursor-pointer text-sm"
          >
            <option value="All" className="bg-slate-900">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id} className="bg-slate-900">{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="w-px h-8 bg-white/10 hidden md:block" />
        <div className="flex items-center gap-3 px-4">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Timeline</span>
          <select 
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="bg-transparent font-bold text-white outline-none cursor-pointer text-sm"
          >
            <option value="All" className="bg-slate-900">Entire History</option>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
              <option key={m} value={i} className="bg-slate-900">{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[32px] border border-white/5">
        <table className="min-w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Descriptor</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Classification</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {filteredExpenses.map((exp) => (
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
            {filteredExpenses.length === 0 && (
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