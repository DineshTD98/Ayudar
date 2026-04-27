import { useState, useEffect } from "react";
import useapi from "../customehooks/useapi";

import { addExpense } from "../redux/slices/expenseslice";
import { useDispatch } from "react-redux";
function Expenses() {
  const { request } = useapi();

  const dispatch = useDispatch();

  const [rows, setRows] = useState([
    { title: "", category: "", amount: "", date: "" },
  ]);

  // NEW STATE (only for category list)
  const [categories, setCategories] = useState([]);

  // FETCH CATEGORIES
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

  const addRow = () => {
    setRows([...rows, { title: "", category: "", amount: "", date: "" }]);
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const deleteRow = (index) => {
    if(rows[index].title !== ""|| rows.length === 1){
    const confirmdelete = window.confirm("Are you sure you want to delete this row?");
    if (!confirmdelete) return;
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  const submitExpenses = async (e) => {
    e.preventDefault();
    console.log(rows);

    try {
      const response = await request({
        url: "/Budget/createexpense",
        method: "post",
        data: rows,
      });

      const newexpense = response.expense;
      dispatch(addExpense(newexpense));
    } 
    catch (err) {
      console.log(err.message);
    }

    setRows([{ title: "", category: "", amount: "", date: "" }]);
  };

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 lg:p-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Header with buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Log <span className="text-emerald-400">Outlays</span></h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Record new financial transactions for this cycle</p>
        </div>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={addRow}
            className="flex-1 sm:flex-none group flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/10 transition-all active:scale-95"
          >
            <svg className="w-5 h-5 text-blue-400 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Entry
          </button>

          <button
            type="submit"
            form="expense-form"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Commit
          </button>
        </div>
      </div>

      <form id="expense-form" onSubmit={submitExpenses}>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Descriptor</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Classification</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount (₹)</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Drop</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {rows.map((row, index) => (
                <tr key={index} className="group transition-all">
                  <td className="px-4 py-4">
                    <input
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      value={row.title}
                      onChange={(e) => updateRow(index, "title", e.target.value)}
                      placeholder="e.g., Grocery Shopping"
                      required
                    />
                  </td>

                  <td className="px-4 py-4">
                    <select
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all appearance-none"
                      value={row.category}
                      onChange={(e) => updateRow(index, "category", e.target.value)}
                      required
                    >
                      <option value="" className="bg-slate-900">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id} className="bg-slate-900">{cat.name}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-4 py-4">
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-bold placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      value={row.amount}
                      onChange={(e) => updateRow(index, "amount", e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </td>

                  <td className="px-4 py-4">
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      value={row.date}
                      onChange={(e) => updateRow(index, "date", e.target.value)}
                      required
                    />
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => deleteRow(index)}
                      className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-6">
          {rows.map((row, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-6 relative group animate-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => deleteRow(index)}
                  className="text-red-400 p-1 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Descriptor</label>
                  <input
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    value={row.title}
                    onChange={(e) => updateRow(index, "title", e.target.value)}
                    placeholder="Title"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Classification</label>
                    <select
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none"
                      value={row.category}
                      onChange={(e) => updateRow(index, "category", e.target.value)}
                      required
                    >
                      <option value="" className="bg-slate-900">Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id} className="bg-slate-900">{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Amount</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold"
                      value={row.amount}
                      onChange={(e) => updateRow(index, "amount", e.target.value)}
                      placeholder="₹ 0.00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Timestamp</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    value={row.date}
                    onChange={(e) => updateRow(index, "date", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Expenses;
