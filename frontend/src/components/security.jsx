import { useDispatch } from "react-redux";
import { setprofile } from "../redux/slices/profile";
import { useState } from "react";
import useApi from "../customehooks/useapi";
import toast from "react-hot-toast";

export default function Security() {
  const dispatch = useDispatch();
  const { request } = useApi();
  const [newusername, setUsername] = useState("");
  const [openinput, setOpeninput] = useState(false);

  const [newpassword, setNewpassword] = useState("");
  const [openpassword, setOpenpassword] = useState(false);

  const handleusername = async () => {
    if (!newusername.trim()) return;
    try {
      const response = await request({
        url: "/profile/updateusername",
        method: "PATCH",
        data: { newusername },
      });
      toast.success("Username updated successfully");
      dispatch(setprofile(response.updatedUser));
      setOpeninput(false);
      setUsername("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update username");
    }
  };

  const handlepassword = async () => {
    if (!newpassword.trim()) return;
    try {
      const response = await request({
        url: "/profile/updatepassword",
        method: "PATCH",
        data: { newpassword },
      });
      toast.success("Password updated successfully");
      dispatch(setprofile(response.updatedUser));
      setOpenpassword(false);
      setNewpassword("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[40px] p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">Security Center</h3>
            <p className="text-slate-500 text-sm font-medium">Protect your account access</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Username Section */}
          <div className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-lg">Username</p>
                <p className="text-slate-500 text-sm">Change your unique identification</p>
              </div>
              {!openinput ? (
                <button
                  onClick={() => setOpeninput(true)}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10 active:scale-95"
                >
                  Update
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto animate-in slide-in-from-right-2 duration-300">
                  <input
                    type="text"
                    placeholder="New username"
                    value={newusername}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 sm:w-48 bg-slate-900 border border-indigo-500/30 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button onClick={handleusername} className="p-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button onClick={() => setOpeninput(false)} className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Password Section */}
          <div className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-lg">Password</p>
                <p className="text-slate-500 text-sm">Update your secret credentials</p>
              </div>
              {!openpassword ? (
                <button
                  onClick={() => setOpenpassword(true)}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10 active:scale-95"
                >
                  Change
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto animate-in slide-in-from-right-2 duration-300">
                  <input
                    type="password"
                    placeholder="New password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                    className="flex-1 sm:w-48 bg-slate-900 border border-indigo-500/30 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button onClick={handlepassword} className="p-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button onClick={() => setOpenpassword(false)} className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <h4 className="text-rose-400 font-bold uppercase tracking-widest text-[10px] mb-4">Danger Zone</h4>
          <button className="w-full sm:w-auto px-8 py-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-rose-500/5">
            Delete My Account Permanently
          </button>
          <p className="text-slate-600 text-xs mt-4">Once deleted, all your data including documents and financial records will be purged. This action is irreversible.</p>
        </div>
      </div>
    </div>
  );
}