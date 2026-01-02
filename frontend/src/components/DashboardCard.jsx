import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, icon, content, link, color, footer }) => {
  const navigate = useNavigate();

  return (
    <div className="relative group overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/15 p-6 flex flex-col h-full">
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-30 ${color || 'bg-emerald-500'}`}></div>

      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${color || 'bg-emerald-500/20'} text-white`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white/90">{title}</h3>
      </div>

      <div className="flex-grow text-white/70">
        {content}
      </div>

      {footer && (
        <div className="mt-6 pt-4 border-t border-white/10">
          {footer}
        </div>
      )}

      {link && (
        <button
          onClick={() => navigate(link)}
          className="mt-4 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors duration-200"
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default DashboardCard;
