import { useEffect, useState } from "react";
import useApi from "../customehooks/useapi";
import { useDispatch, useSelector } from "react-redux";
import { setprofile } from "../redux/slices/profile";
import toast from "react-hot-toast";

export default function Preference() {
  const { request, loading } = useApi();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Profile.value);

  const [formData, setFormData] = useState({
    language: "English",
    currency: "INR",
    notifications: true,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        language: profile.language || "English",
        currency: profile.currency || "INR",
        notifications: profile.notifications !== undefined ? profile.notifications : true,
      });
    }
  }, [profile]);

  const handleUpdatePreferences = async (newData) => {
    try {
      const response = await request({
        url: "/profile/updateprofile",
        method: "PATCH",
        data: { ...profile, ...newData },
      });
      dispatch(setprofile(response.updatedUser));
    } catch (err) {
      console.log(err);
      toast.error("Failed to update preferences");
    }
  };

  const handleToggle = () => {
    const nextValue = !formData.notifications;
    setFormData({ ...formData, notifications: nextValue });
    handleUpdatePreferences({ notifications: nextValue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleUpdatePreferences({ [name]: value });
  };

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 sm:p-12 space-y-10">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">App <span className="text-indigo-400">Preferences</span></h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Customize your interface and notification settings</p>
        </div>

        <div className="space-y-8">
          {/* Notification Toggle */}
          <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-xl">🔔</div>
              <div>
                <p className="text-white font-bold">Push Notifications</p>
                <p className="text-slate-500 text-xs mt-1">Receive updates about budget cycles and events</p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${formData.notifications ? 'bg-indigo-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${formData.notifications ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>

          {/* Select Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">🌐</span>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Language</label>
              </div>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-slate-800/50 text-white font-bold py-3 px-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="English">English (US)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">💵</span>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Currency</label>
              </div>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full bg-slate-800/50 text-white font-bold py-3 px-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">Pound (£)</option>
              </select>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-4">
            <span className="text-xl mt-1">💡</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              These preferences are saved to your account and will sync across all your devices. Some changes may require a page refresh to take full effect.
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-indigo-400 font-bold animate-pulse">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            <span className="text-[10px] uppercase tracking-widest">Syncing with cloud...</span>
          </div>
        )}
      </div>
    </div>
  );
}