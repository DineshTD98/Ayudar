import { useState, useMemo, useEffect } from "react";
import useapi from "../customehooks/useapi";

function Expensetable({expense}) {
  const { request } = useapi();
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [categories, setCategories] = useState([]);

  // Fetch categories for the filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request({
          url: "/Budget/categories",
          method: "get",
        });
        setCategories(res.categories);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();
  }, []);

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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 px-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</span>
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer text-sm"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
          <div className="flex items-center gap-2 px-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Month</span>
            <select 
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer text-sm"
            >
              <option value="All">Select Month</option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.map((exp) => (
              <tr
                key={exp._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2 text-gray-800">
                  {exp.title}
                </td>
                <td className="px-4 py-2 text-gray-800 font-medium">
                  ₹{exp.amount}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {typeof exp.category === 'object' 
                    ? exp.category?.name 
                    : (categories.find(c => c._id === exp.category)?.name || "others")
                  }
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-400 italic">
                  No expenses matches your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>   
     </>
  )
}

export default Expensetable