import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useapi from "../customehooks/useapi";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Uploaddocuments() {
  const { setReload } = useOutletContext();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [preview, setPreview] = useState("");
  const [files, setFiles] = useState(null);
  
  const navigate = useNavigate();
  const { request } = useapi();

  // General document categories
  const generalCategories = [
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

  const handlechange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    
    setFiles(selected);
    if (selected.type.startsWith("image")) {
      setPreview(URL.createObjectURL(selected));
    } else if (selected.type.startsWith("application/pdf")) {
      setPreview("pdf");
    } else if (selected.type.includes("word") || selected.type.includes("officedocument")) {
      setPreview("word");
    } else {
      setPreview("file");
    }
  };

  const handleupload = async (e) => {
    e.preventDefault();
    if (!files) return toast.error("Please select a file first.");
    if (!category) return toast.error("Please select a category.");
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("image", files);

    try {
      await request({
        url: "/documents/createdocument",
        method: "post",
        data: formData,
      });
      
      setName("");
      setCategory("");
      setDate("");
      setPreview("");
      setFiles(null);
      toast.success("Document uploaded successfully!");
      setReload(true);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to upload document.");
    }
  };

  return (
    <div className="min-h-screen text-slate-200 p-6 pt-32">
      <div className="relative z-10 max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-white tracking-tight">Upload <span className="text-blue-400">Documents</span></h1>
            <p className="text-slate-400 mt-2 font-medium">Keep your important certificates safe and accessible</p>
          </div>
          
          <button
            onClick={() => navigate("/document/viewdocuments")}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold border border-white/10 transition-all active:scale-95"
          >
            View Documents
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 sm:p-10 shadow-2xl h-fit">
            <form onSubmit={handleupload} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Document Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                  placeholder="e.g., Degree Certificate"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Category</label>
                  <div className="relative group">
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer font-bold"
                      required
                    >
                      <option value="" disabled className="bg-slate-900">Select Category</option>
                      {generalCategories.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">File</label>
                <label className="flex flex-col items-center justify-center w-full h-48 rounded-[32px] border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 cursor-pointer transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-16 h-16 mb-4 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-400 font-bold text-center px-4">Click to upload file</p>
                    <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest font-black text-center px-4">PDF, PNG, JPG, DOCX (Max 10MB)</p>
                  </div>
                  <input 
                    type="file" 
                    onChange={handlechange} 
                    className="hidden" 
                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                  />
                </label>
              </div>

              {files && (
                <button
                  type="submit"
                  className="w-full group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  Upload
                  <svg className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              )}
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
              {preview ? (
                <div className="w-full space-y-6 animate-in zoom-in-95 duration-500">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 text-center">Preview</h4>
                  <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-white/10 aspect-[3/4] flex items-center justify-center shadow-2xl">
                    {preview === "pdf" && (
                      <div className="flex flex-col items-center gap-4">
                        <svg className="w-24 h-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <p className="font-bold text-white text-sm uppercase tracking-widest">PDF Document</p>
                      </div>
                    )}
                    {preview === "word" && (
                      <div className="flex flex-col items-center gap-4">
                        <svg className="w-24 h-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="font-bold text-white text-sm uppercase tracking-widest">Word Document</p>
                      </div>
                    )}
                    {preview === "file" && (
                      <div className="flex flex-col items-center gap-4">
                        <svg className="w-24 h-24 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="font-bold text-white text-sm">File</p>
                      </div>
                    )}
                    {preview !== "pdf" && preview !== "word" && preview !== "file" && (
                      <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-white font-black truncate px-4 text-sm uppercase tracking-tight">{files?.name}</p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                      {(files?.size / 1024 / 1024).toFixed(2)} MB • {files?.type.split('/')[1] || "File"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6 opacity-10">
                  <svg className="w-24 h-24 mx-auto text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-black uppercase tracking-[0.4em]">No Preview</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/10 rounded-[40px] p-8 shadow-2xl flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
                🔒
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Your documents are stored securely. Only you have access to these files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploaddocuments;
