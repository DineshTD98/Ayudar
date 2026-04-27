export default function Transactions() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 lg:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Visual Element */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full"></div>
        <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 shadow-3xl">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[32px] flex items-center justify-center text-6xl shadow-2xl shadow-indigo-500/20 rotate-12 transition-transform hover:rotate-0 duration-500">
            📊
          </div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500/20 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-2xl animate-bounce duration-[3000ms]">
          💸
        </div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-3xl animate-pulse">
          💳
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-6 max-w-lg">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Feature in Development</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Advanced <span className="text-indigo-400">Transaction</span> Analytics
        </h1>
        
        <p className="text-slate-400 text-lg font-medium leading-relaxed">
          We're building a powerful new way to visualize your financial flow. Deep-dive into historical data with AI-powered insights and smart categorization.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover opacity-60" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Join 1,240+ early testers
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-4xl h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
}
