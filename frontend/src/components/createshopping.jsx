import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../customehooks/useapi";

function Createshopping() {
  const [editQty, setEditQty] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    productname: "",
    category: "",
    quantity: "",
  });
  
  const { request } = useApi();
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  // Pre-defined shopping categories
  const categories = [
    "Grocery",
    "Dairy",
    "Fruits & Veg",
    "Meat & Poultry",
    "Snacks",
    "Household",
    "Personal Care",
    "Electronics",
    "Other"
  ];

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const exists = list.some(
      (item) => item.productname.toLowerCase() === form.productname.toLowerCase()
    );

    if (!exists) {
      setList([...list, form]);
      setForm({ productname: "", category: "", quantity: "" });
    } else {
      alert("Item already exists in the queue");
    }
  };

  const handleUpdateClick = (index, quantity) => {
    setEditQty(quantity);
    setEditIndex(index);
  };

  const handlenewqnty = (index) => {
    const updated = list.map((item, i) => i === index ? { ...item, quantity: editQty } : item);
    setList(updated);
    setEditIndex(null);
    setEditQty('');
  };

  const handledelete = (index) => {
    const confirmdelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmdelete) return;
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
  };

  const handlesave = async () => {
    try {
      await request({
        url: '/shopping/createshopping',
        method: "post",
        data: list
      });
      setList([]);
      alert("Shopping list saved successfully!");
    } catch (err) {
      console.error("Save error:", err.message);
      alert("Failed to save shopping list.");
    }
  };

  return (
    <div className="min-h-screen text-slate-200 p-6 pt-32">
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3">
              <svg className="w-8 h-8 text-white -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">Shopping <span className="text-emerald-400">List</span></h1>
              <p className="text-slate-400 mt-1 font-medium italic underline decoration-emerald-500/30">Plan your household needs</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/shopping/viewshopping")}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10 flex items-center gap-2"
            >
              Vault
            </button>
            {list.length > 0 && (
              <button
                onClick={handlesave}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                Save Draft
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-4 h-fit">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl sticky top-36">
              <h2 className="text-xl font-black text-white mb-8 tracking-tight uppercase text-xs opacity-50">Quick Add Entry</h2>
              
              <form onSubmit={handlesubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Product Name</label>
                  <input
                    type="text"
                    name="productname"
                    value={form.productname}
                    onChange={handlechange}
                    placeholder="Enter item name..."
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handlechange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={form.quantity}
                    onChange={handlechange}
                    placeholder="e.g., 2 kg, 1 pack"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 mt-4"
                >
                  Add to Queue
                </button>
              </form>
            </div>
          </div>

          {/* List Preview Table */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl min-h-[500px]">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-white tracking-tight">Queue <span className="text-slate-600">Preview</span></h2>
                <div className="px-4 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {list.length} Records
                </div>
              </div>

              <div className="overflow-x-auto rounded-[32px] border border-white/5">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Classification</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Product</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {list.length > 0 ? (
                      list.map((item, index) => (
                        <tr key={index} className="group hover:bg-white/5 transition-all">
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                              {item.category || "Misc"}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-white font-bold text-lg tracking-wide">{item.productname}</span>
                          </td>
                          <td className="px-8 py-6">
                            {editIndex === index ? (
                              <div className="flex items-center gap-2 animate-in zoom-in-95 duration-200">
                                <input
                                  type="text"
                                  value={editQty}
                                  onChange={(e) => setEditQty(e.target.value)}
                                  className="w-24 px-4 py-2 bg-white/10 border border-emerald-500/50 rounded-xl text-white focus:outline-none font-bold"
                                />
                                <button onClick={() => handlenewqnty(index)} className="p-2 bg-emerald-500 text-white rounded-lg shadow-lg">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <span className="text-white font-black tabular-nums">{item.quantity}</span>
                            )}
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleUpdateClick(index, item.quantity)}
                                className="p-3 text-slate-600 hover:text-blue-400 hover:bg-blue-400/10 rounded-2xl transition-all"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handledelete(index)}
                                className="p-3 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-40 text-center">
                          <div className="flex flex-col items-center gap-4 opacity-10">
                            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-2xl font-black italic tracking-widest uppercase">Vault Empty</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createshopping;