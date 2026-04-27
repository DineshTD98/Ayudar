import { useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Budgetcards({ totalexpense }) {
  const Createbudget = useSelector((state) => state.Createbudget.value);
  const Totalbudget = useSelector((state) => state.Totalbudget.value);
  const { remainingbudget, creditcardamount } = useContext(UserContext);

  const monthlydate = new Date();

  // Find the latest income entry (any source) to calculate the next cycle date
  const latestIncome = Array.isArray(Createbudget)
    ? [...Createbudget].reverse().find((item) => item.createddate)
    : null;

  let nextCycleDate;
  if (latestIncome && latestIncome.createddate) {
    const entryDate = new Date(latestIncome.createddate);
    nextCycleDate = new Date(entryDate);
    nextCycleDate.setDate(entryDate.getDate() + 30);
  } else {
    // Default to 30 days from today if no income found
    nextCycleDate = new Date();
    nextCycleDate.setDate(nextCycleDate.getDate() + 30);
  }

  nextCycleDate.setHours(0, 0, 0, 0);
  monthlydate.setHours(0, 0, 0, 0);

  const remainingdays = nextCycleDate - monthlydate;
  const remainingdaysinmonth = Math.max(0, Math.ceil(remainingdays / (1000 * 60 * 60 * 24)));

  // Total funds available (saved total + current pending income)
  const totalamount = (Array.isArray(Totalbudget)
    ? Totalbudget.reduce((sum, item) => sum + Number(item.nettotal || 0), 0)
    : 0) + (Array.isArray(Createbudget)
      ? Createbudget.reduce((sum, item) => sum + Number(item.amount || 0), 0)
      : 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {/* Total Assets Card */}
      <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-500 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Total Amount</p>
        <h3 className="text-xl sm:text-3xl font-bold text-white tabular-nums">
          ₹{(totalamount > 0 ? totalamount : 0).toLocaleString()}
        </h3>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active Funds</span>
        </div>
      </div>

      {/* Expenses Card */}
      <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 hover:bg-rose-500/5 hover:border-rose-500/30 transition-all duration-500 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-12 h-12 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Expenses</p>
        <h3 className="text-xl sm:text-3xl font-bold text-white tabular-nums">
          ₹{(totalexpense > 0 ? totalexpense : 0).toLocaleString()}
        </h3>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Expenses + Subs</span>
        </div>
      </div>

      {/* Net Balance Card */}
      <div className="group bg-slate-900 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50"></div>
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2 relative z-10">Remaining</p>
        <h3 className="text-2xl sm:text-4xl font-black text-white tabular-nums relative z-10 tracking-tight">
          ₹{(remainingbudget > 0 ? remainingbudget : 0).toLocaleString()}
        </h3>
        <div className="mt-4 flex items-center gap-2 relative z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Liquidity Status</span>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 hover:bg-amber-500/5 hover:border-amber-500/30 transition-all duration-500 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-12 h-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Date</p>
        <h3 className="text-xl font-bold text-white tracking-tight">
          {monthlydate.toDateString()}
        </h3>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining days: {remainingdaysinmonth}</span>
        </div>
      </div>

      {/* Credit Capacity - Conditional Secondary Card */}
      {creditcardamount > 0 && (
        <div className="col-span-2 lg:col-span-4 bg-white/5 border border-dashed border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-xl italic font-black text-indigo-400">CC</div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Credit Line</p>
              <p className="text-lg font-bold text-white tabular-nums">₹{creditcardamount.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full uppercase tracking-widest">External Liquidity</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Budgetcards;
