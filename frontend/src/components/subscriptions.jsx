import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSubscription } from "../redux/slices/subscriptionslice";
import useapi from "../customehooks/useapi";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";

function Subscriptions() {
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    renewal: "monthly",
    duedate: "",
    price: "",
  });

  const { request, loading } = useapi();
  const [createsubscription, setCreateSubscription] = useState(false);
  const subscriptionitems = useSelector(
    (state) => state.Subscriptionlist?.value || [],
  );
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubscription = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        url: "/budget/createsubscription",
        method: "post",
        data: form,
      });
      dispatch(
        setSubscription([...subscriptionitems, response.subscriptionlist]),
      );
      setForm({ name: "", renewal: "monthly", duedate: "", price: "" });
      setCreateSubscription(false);
      toast.success("Subscription added");
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to add subscription");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await request({
        url: `/budget/deletesubscription/${deleteId}`,
        method: "delete",
      });
      dispatch(
        setSubscription(
          subscriptionitems.filter((item) => item._id !== response.deletedid),
        ),
      );
      toast.success("Subscription removed");
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to remove subscription");
    } finally {
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  const handledelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Recurring <span className="text-indigo-400">Commitments</span>
            </h1>
            <p className="text-slate-400 mt-3 font-medium text-lg">
              Monitor and manage your recurring digital services
            </p>
          </div>
          <button
            onClick={() => setCreateSubscription(true)}
            className="group relative flex items-center gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 transition-all active:scale-95"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Subscription
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Create Subscription Modal */}
        {createsubscription && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setCreateSubscription(false)}></div>
            <div className="relative bg-slate-900 border border-white/10 w-full max-w-md rounded-[40px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-8 py-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-black text-white tracking-tight">New Subscription</h2>
                <button onClick={() => setCreateSubscription(false)} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all text-2xl">×</button>
              </div>
              <form onSubmit={handlesubscription} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Service Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handlechange}
                      placeholder="e.g., Netflix, Spotify"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Cycle</label>
                      <select
                        name="renewal"
                        value={form.renewal}
                        onChange={handlechange}
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="monthly" className="bg-slate-900">Monthly</option>
                        <option value="yearly" className="bg-slate-900">Yearly</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handlechange}
                        placeholder="0.00"
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">First Due Date</label>
                    <input
                      type="date"
                      name="duedate"
                      value={form.duedate}
                      onChange={handlechange}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setCreateSubscription(false)} className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-95">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {subscriptionitems.length === 0 && !loading ? (
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-20 text-center space-y-6">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto text-4xl">📡</div>
            <h3 className="text-2xl font-black text-white">No active subscriptions</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Track your recurring monthly and yearly payments to keep your budget in check.</p>
            <button onClick={() => setCreateSubscription(true)} className="px-8 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-2xl font-bold transition-all">
              Initialize First Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptionitems.map((list) => (
              <div key={list._id} className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-500 shadow-2xl">
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-white tracking-tight truncate max-w-[180px]">{list.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        list.renewal === 'monthly' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {list.renewal}
                      </span>
                    </div>
                    <button onClick={() => handledelete(list._id)} className="p-3 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>

                  <div className="py-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white tabular-nums">₹{list.price}</span>
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">/ {list.renewal === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Next Bill</p>
                      <p className="text-white font-bold">{new Date(list.duedate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                      <div className="flex items-center justify-end gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-400 font-black uppercase tracking-widest text-[10px]">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <ConfirmationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
          title="Cancel Subscription"
          message="Are you sure you want to stop tracking this recurring payment? This won't cancel the actual service, but will remove it from your budget reports."
        />
      </div>
    </div>
  );
}

export default Subscriptions;
