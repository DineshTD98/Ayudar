import { useSelector, useDispatch } from "react-redux";
import { setDocument } from "../redux/slices/documentslice";
import useapi from "../customehooks/useapi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

function Viewdocuments() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { reload, setReload } = useOutletContext();
  const { request } = useapi();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Documentlist = useSelector((state) => state.Documentlist.value);

  // General categories for filter
  const categories = [
    "Personal",
    "Education",
    "Identity",
    "Health",
    "Finance",
    "Property",
    "Employment",
    "Household",
    "Legal",
    "Other"
  ];

  useEffect(() => {
    async function documentfetch() {
      try {
        const response = await request({
          url: "/documents/getdocument",
          method: "GET",
        });
        if (Array.isArray(response.document)) {
          dispatch(setDocument(response.document));
          setReload(false);
        } else {
          dispatch(setDocument([]));
          setReload(false);
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    }
    documentfetch();
  }, [reload]);

  const handledelete = async (id) => {
    const confirmdelete = window.confirm("Are you sure you want to delete this document?");
    if (!confirmdelete) return;
    try {
      const response = await request({
        url: `/documents/deletedocument/${id}`,
        method: "delete",
      });
      const updatedlist = Documentlist.filter((data) => data._id !== response.deletedid);
      dispatch(setDocument(updatedlist));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handledownload = (fileUrl, filename) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename || "document";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDocuments = useMemo(() => {
    return Documentlist.filter((doc) => {
      const categoryMatch = filterCategory === "All" || doc.category === filterCategory;
      const searchMatch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                          doc.category.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [Documentlist, filterCategory, search]);

  return (
    <div className="min-h-screen text-slate-200 p-6 pt-32">
      <div className="relative z-10 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">View <span className="text-blue-400">Documents</span></h1>
            <p className="text-slate-400 mt-1 font-medium">Your collection of important records</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative group flex-1 md:min-w-[250px]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="All" className="bg-slate-900">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
              ))}
            </select>

            <button
              onClick={() => navigate("/document/uploaddocuments")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Document Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDocuments.map((data) => (
              <div key={data._id} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-2 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-4 bg-slate-800 border border-white/5">
                  {data.fileType === "application/pdf" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-500/20 to-orange-500/20">
                      <svg className="w-16 h-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">PDF</span>
                    </div>
                  ) : data.fileType?.includes("word") || data.fileType?.includes("officedocument") ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                      <svg className="w-16 h-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">WORD</span>
                    </div>
                  ) : (
                    <img
                      src={`${BASE_URL}/uploads/${data.fileUrl}`}
                      alt={data.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                    <button
                      onClick={() => handledownload(`${BASE_URL}/uploads/${data.fileUrl}`, data.name)}
                      className="p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-90"
                      title="Download"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handledelete(data._id)}
                      className="p-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all shadow-xl active:scale-90"
                      title="Delete"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <h3 className="font-black text-white truncate text-lg tracking-tight mb-2">{data.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">{data.category}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(data.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white/5 backdrop-blur-2xl rounded-[48px] border border-white/10 border-dashed">
            <p className="text-xl font-black text-white">No documents found</p>
            <p className="text-slate-500 mt-2 font-medium">Try a different filter or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Viewdocuments;
