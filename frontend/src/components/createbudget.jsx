import { useEffect, useState, useMemo } from "react";
import { setCreatebudget } from "../redux/slices/createbudgetslice";
import { updateTotalbudget } from "../redux/slices/totalbudgetslice";
import { useDispatch, useSelector } from "react-redux";
import useapi from "../customehooks/useapi";
import { useOutletContext } from "react-router-dom";
function Createbudget() {
  const {setCreditcardamount}=useOutletContext();
  const Createbudget = useSelector((state) => state.Createbudget.value);
  const { request, error, loading } = useapi();
  const [creditcard, setCreditcard] = useState("");
  const dispatch = useDispatch();
  const [nettotal, setNettotal] = useState(0);
  const [sessionIncome, setSessionIncome] = useState(0);
  const [sessionCreditAmount, setSessionCreditAmount] = useState(0);
  const [filterSource, setFilterSource] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  
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
      setSessionIncome(response.Createdbudget.amount);
    } catch (err) {
      console.log(err.message);
    }
  };

  //useeffect to add amount to the nettotal 
  useEffect(() => {
    setNettotal(
      Number(sessionCreditAmount || 0) +
        Number(sessionIncome || 0),
    );
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
      setSessionCreditAmount(response.creditbudget.limit);
    } catch (err) {
      return console.log(err.message);
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
          console.log(response.activebudget)
          dispatch(setCreatebudget([]))
          dispatch(updateTotalbudget(response.activebudget))
          setCreditcardamount('')
          setNettotal(0)
          setSessionIncome(0)
          setSessionCreditAmount(0)
      }
      catch(err){
        console.log(err.message)
      }
  }

  // filtering for the table

  const filteredBudgets = useMemo(() => {
    return Createbudget.filter((item) => {
      const sourceMatch = filterSource === "All" || item.source === filterSource;
      
      const itemDate = item.createddate ? new Date(item.createddate) : null;
      const itemMonth = itemDate ? itemDate.getMonth() : -1;
      const monthMatch = filterMonth === "All" || itemMonth === Number(filterMonth);
      
      return sourceMatch && monthMatch;
    });
  }, [Createbudget, filterSource, filterMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          Create Budget
        </h1>
        <p className="text-slate-500 text-lg">
          Plan your finances and track your spending goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Forms Section (Left) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Budget Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
            <div className="bg-emerald-900 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-bold text-xl flex items-center gap-2">
                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">💰</span>
                Income Source
              </h2>
            </div>
            
            <form onSubmit={handlesubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block ml-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handlechange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block ml-1">
                    Created Date
                  </label>
                  <input
                    type="date"
                    name="createddate"
                    value={form.createddate}
                    onChange={handlechange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 block ml-1">
                    Source of Income
                  </label>
                  <select
                    name="source"
                    value={form.source}
                    onChange={handlechange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")` }}
                  >
                    <option value="" disabled>Select the source of income</option>
                    <option value="Salary">Salary </option>
                    <option value="Family income">Family income </option>
                    <option value="Business">Business </option>
                    <option value="Other">Other </option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Generate Budget
                </button>
              </div>
            </form>
          </div>

          {/* Credit Card Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
            <div className="bg-gray-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-bold text-xl flex items-center gap-2">
                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">💳</span>
                Credit Card Configuration
              </h2>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <label className="text-sm font-bold text-slate-700">Do you have a credit card?</label>
                <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                  <button 
                    onClick={() => setCreditcard("yes")}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${creditcard === 'yes' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setCreditcard("no")}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${creditcard === 'no' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    No
                  </button>
                </div>
              </div>

              {creditcard === "yes" && (
                <form onSubmit={handlecreditsubmit} className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 block ml-1">Card Name</label>
                      <input
                        type="text"
                        name="creditcardname"
                        value={creditcardform.creditcardname}
                        onChange={handlecreditchange}
                        placeholder="e.g., Rewards Visa"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 block ml-1">Limit Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                        <input
                          type="number"
                          name="limit"
                          value={creditcardform.limit}
                          onChange={handlecreditchange}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 block ml-1">Interest Rate (%)</label>
                      <input
                        type="text"
                        name="interest"
                        value={creditcardform.interest}
                        onChange={handlecreditchange}
                        placeholder="12.5"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 block ml-1">Due Date</label>
                      <input
                        type="date"
                        name="duedate"
                        value={creditcardform.duedate}
                        onChange={handlecreditchange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
                      Add Card
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-black rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
          
            <div className="relative space-y-8">
              <h3 className="text-white font-bold text-lg tracking-wide uppercase opacity-60">Financial Preview</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <p className="text-white/60 text-xs font-bold uppercase">Income Added</p>
                    <p className="text-white text-xl font-semibold">₹{sessionIncome.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <p className="text-white/60 text-xs font-bold uppercase">Credit Allocated</p>
                    <p className="text-white text-xl font-semibold">₹{sessionCreditAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-white/60 text-xs font-bold uppercase mb-2">Adjusted Net Total</p>
                  <p className="text-white text-5xl font-black tracking-tight">
                    <span className="text-2xl font-normal opacity-40 mr-1">₹</span>
                    {nettotal.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleamount}
                  className="flex-1 bg-white hover:bg-slate-100 text-slate-900 font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    Save Changes
                </button>
                <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Details Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              Budget History
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 px-3">
                <span className="text-xs font-bold text-slateuppercase">Source</span>
                <select 
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All">All Sources</option>
                  <option value="Salary">Salary</option>
                  <option value="Family income">Family income</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div className="flex items-center gap-2 px-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Month</span>
                <select 
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All">Select Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                    <option key={m} value={i}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">#</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Category / Source</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Created Date</th>
                  <th className="px-6 py-4 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBudgets.map((item, index) => (
                  <tr key={index} className="group hover:bg-slate-50/80 transition-all cursor-default">
                    <td className="px-6 py-4 text-slate-400 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* <span className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-emerald-400' : 'bg-indigo-400'}`}></span> */}
                        <span className="font-bold text-slate-700 ms-6">{item.source}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-black text-slate-800">₹{Number(item.amount).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 font-medium">
                      {new Date(item.createddate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    {/* <td className="px-6 py-4 text-center opacity-0 group-hover:opacity-100 transition-all">
                      <button className="text-slate-300 hover:text-red-500 transition-colors">🗑️</button>
                    </td> */}
                  </tr>
                ))}
                {filteredBudgets.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
                      No budget entries found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Createbudget;
