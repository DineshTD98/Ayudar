import { useState, useMemo } from "react";
import { setCreatebudget } from "../redux/slices/createbudgetslice";
import { setTotalbudget } from "../redux/slices/totalbudgetslice";
import { updateTotalbudget } from "../redux/slices/totalbudgetslice";
import { useDispatch, useSelector } from "react-redux";
import useapi from "../customehooks/useapi";
import { useOutletContext } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";

function Createbudget() {
  const {setCreditcardamount,creditcardamount}=useOutletContext();
  const CreatebudgetList = useSelector((state) => state.Createbudget.value);
  const { request } = useapi();
  const [creditcard, setCreditcard] = useState("");
  const dispatch = useDispatch();
  const [filterSource, setFilterSource] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);

  // Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // form state creation to add the budget
  const [form, setForm] = useState({
    amount: "",
    createddate: "",
    source: "",
  });

  // form to add the credit card budget
  const [creditcardform, setcreditcardForm] = useState({
    creditcardname: "",
    interest: "",
    limit: "",
    duedate: "",
  });

  //budget form handle
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // credit card form handle 
  const handlecreditchange = (e) => {
    setcreditcardForm({ ...creditcardform, [e.target.name]: e.target.value });
  };


  // generate button handle
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        url: "/budget/createbudget",
        method: "post",
        data: form,
      });
      console.log(response.Createdbudget);
      dispatch(setCreatebudget([...Createbudget, response.Createdbudget]));
    } catch (err) {
      console.log(err.message);
    }
  };


  // Derive session totals from Redux and Context
  const sessionIncome = useMemo(() => {
    return Createbudget.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [Createbudget]);

  const sessionCreditAmount = Number(creditcardamount || 0);

  const nettotal = useMemo(() => {
    return sessionCreditAmount + sessionIncome;
  }, [sessionIncome, sessionCreditAmount]);
  

  // add button to handle the credit card
  const handlecreditsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        url: "/budget/creditbudget",
        method: "post",
        data: creditcardform,
      });
      console.log(response.creditbudget);
      setCreditcardamount(response.creditbudget.limit);
      toast.success("Credit card linked");
    } catch (err) {
      toast.error("Failed to link credit card");
    }
  };

  // creating the total budget

  const handleamount=async()=>{
      try{
          const response=await request({
            url:'/budget/monthlybudget',
            method:'post',
            data:{nettotal}
          })
          dispatch(setCreatebudget([]))
          dispatch(updateTotalbudget(response.activebudget))
          setCreditcardamount(0)
          toast.success("Financial cycle saved successfully");
        }
      catch(err){
        toast.error("Failed to save cycle");
      }
  }

  const handleClearHistory = () => {
    setModalConfig({
      isOpen: true,
      title: "Clear History",
      message: "Are you sure you want to clear your entire budget history? This action cannot be undone.",
      onConfirm: async () => {
        try {
          await request({ url: '/budget/deletetotalbudget', method: 'delete' });
          dispatch(setTotalbudget([]));
          toast.success("Budget history cleared");
        } catch (err) {
          toast.error("Failed to clear history");
        }
      }
    });
  };

  const handleClearCredit = () => {
    setModalConfig({
      isOpen: true,
      title: "Clear Credit",
      message: "Are you sure you want to clear your credit card allocation?",
      onConfirm: async () => {
        try {
          await request({ url: '/budget/clearcreditcard', method: 'delete' });
          setCreditcardamount(0);
          toast.success("Credit allocation cleared");
        } catch (err) {
          toast.error("Failed to clear credit");
        }
      }
    });
  };

  // filtering for the table

  const filteredBudgets = useMemo(() => {
    return CreatebudgetList.filter((item) => {
      const sourceMatch = filterSource === "All" || item.source === filterSource;
      
      const itemDate = item.createddate ? new Date(item.createddate) : null;
      const itemMonth = itemDate ? itemDate.getMonth() : -1;
      const monthMatch = filterMonth === "All" || itemMonth === Number(filterMonth);
      
      return sourceMatch && monthMatch;
    });
  }, [CreatebudgetList, filterSource, filterMonth]);


  // deleting budget from the table

  const handledeletebudget = (id) => {
    setModalConfig({
      isOpen: true,
      title: "Delete Entry",
      message: "Are you sure you want to delete this specific income entry?",
      onConfirm: async () => {
        try {
          await request({ url: `/budget/deletebudget/${id}`, method: "delete" });
          const updated = CreatebudgetList.filter((item) => item._id !== id);
          dispatch(setCreatebudget(updated));
          toast.success("Entry removed");
        } catch (err) {
          toast.error("Failed to delete entry");
        }
      }
    });
  };
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={() => {
          modalConfig.onConfirm();
          setModalConfig({ ...modalConfig, isOpen: false });
        }}
        title={modalConfig.title}
        message={modalConfig.message}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Configure Your <span className="text-emerald-400">Budget</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Build your financial foundation. Track income sources and allocate your credit limits with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Forms Section (Left) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Main Budget Form Card */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-8 py-6 border-b border-white/10">
                <h2 className="text-white font-bold text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-xl">💰</div>
                  Income Allocation
                </h2>
              </div>
              
              <form onSubmit={handlesubmit} className="p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                      Amount (₹)
                    </label>
                    <div className="relative group">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">₹</span>
                      <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handlechange}
                        placeholder="0.00"
                        className="w-full pl-10 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                      Entry Date
                    </label>
                    <input
                      type="date"
                      name="createddate"
                      value={form.createddate}
                      onChange={handlechange}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                      Income Source
                    </label>
                    <select
                      name="source"
                      value={form.source}
                      onChange={handlechange}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none bg-no-repeat bg-[right_1.5rem_center]"
                    >
                      <option value="" disabled className="bg-slate-900">Select the source of income</option>
                      <option value="Salary" className="bg-slate-900">Salary</option>
                      <option value="Family income" className="bg-slate-900">Family income</option>
                      <option value="Business" className="bg-slate-900">Business</option>
                      <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="group bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2"
                  >
                    Generate Entry
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Credit Card Card */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-bold text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-xl">💳</div>
                    Credit Card Settings
                  </h2>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                    <button 
                      onClick={() => setCreditcard("yes")}
                      className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${creditcard === 'yes' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => setCreditcard("no")}
                      className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${creditcard === 'no' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                {creditcard === "yes" ? (
                  <form onSubmit={handlecreditsubmit} className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Card Title</label>
                        <input
                          type="text"
                          name="creditcardname"
                          value={creditcardform.creditcardname}
                          onChange={handlecreditchange}
                          placeholder="e.g., Rewards Visa"
                          className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Limit (₹)</label>
                        <input
                          type="number"
                          name="limit"
                          value={creditcardform.limit}
                          onChange={handlecreditchange}
                          placeholder="0.00"
                          className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      {creditcardamount > 0 && (
                        <button onClick={handleClearCredit} type="button" className="text-xs font-black text-red-400 uppercase tracking-widest hover:underline">
                          Clear Current Card
                        </button>
                      )}
                      <button type="submit" className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                        Link Card
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-12 text-slate-500 font-medium italic border-2 border-dashed border-white/5 rounded-3xl">
                    No credit card configured for this cycle.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-slate-900 border border-white/10 rounded-3xl lg:rounded-[48px] p-6 sm:p-8 lg:p-10 shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-[80px]"></div>
            
              <div className="relative space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] opacity-40">Financial Ledger</h3>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-2 group/item">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest group-hover/item:text-emerald-400 transition-colors">Direct Income</p>
                    <p className="text-white text-3xl font-bold tabular-nums">₹{sessionIncome.toLocaleString()}</p>
                  </div>

                  <div className="space-y-2 group/item">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest group-hover/item:text-blue-400 transition-colors">Credit Capacity</p>
                    <p className="text-white text-3xl font-bold tabular-nums">₹{creditcardamount.toLocaleString()}</p>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Adjusted Liquidity</p>
                    <p className="text-white font-black text-4xl sm:text-6xl tracking-tight leading-none tabular-nums">
                      ₹{nettotal.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleamount}
                  className="w-full bg-white hover:bg-slate-100 text-slate-900 font-black py-5 rounded-[24px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  Confirm & Save Cycle
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[48px] overflow-hidden shadow-2xl">
          <div className="p-5 sm:p-10 space-y-6 sm:space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">Ledger History</h2>
                <p className="text-slate-500 text-sm mt-1">Audit trail of all income entries</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 p-2 bg-white/5 rounded-[24px] border border-white/10">
                <select 
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="bg-transparent font-bold text-slate-400 text-xs uppercase tracking-widest px-4 py-2 outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900">All Sources</option>
                  <option value="Salary" className="bg-slate-900">Salary</option>
                  <option value="Family income" className="bg-slate-900">Family income</option>
                  <option value="Business" className="bg-slate-900">Business</option>
                  <option value="Other" className="bg-slate-900">Other</option>
                </select>
                <div className="w-px h-6 bg-white/10" />
                <select 
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="bg-transparent font-bold text-slate-400 text-xs uppercase tracking-widest px-4 py-2 outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900">Entire History</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                    <option key={m} value={i} className="bg-slate-900">{m}</option>
                  ))}
                </select>
                <div className="w-px h-6 bg-white/10" />
                <button 
                  onClick={handleClearHistory}
                  className="text-[10px] font-black text-red-400 hover:text-red-300 uppercase tracking-widest px-4 py-2 transition-colors"
                >
                  Clear History
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-[32px] border border-white/5">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Ref</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Classification</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Amount (INR)</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Timestamp</th>
                    <th className="px-8 py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBudgets.map((item, index) => (
                    <tr key={index} className="group hover:bg-white/5 transition-all">
                      <td className="px-8 py-6 text-slate-600 font-bold tabular-nums">{(index + 1).toString().padStart(2, '0')}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500 transition-colors" />
                          <span className="font-bold text-white tracking-wide">{item.source}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-white tabular-nums">
                        ₹{Number(item.amount).toLocaleString()}
                      </td>
                      <td className="px-8 py-6 text-right text-slate-400 text-sm font-medium">
                        {new Date(item.createddate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button onClick={() => handledeletebudget(item._id)} className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredBudgets.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-slate-600 italic font-medium">
                        No financial records found matching your current filters.
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
  );
}
export default Createbudget;
