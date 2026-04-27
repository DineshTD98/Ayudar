import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useApi from "../customehooks/useapi";
import { useDispatch, useSelector } from "react-redux";
import { setprofile } from "../redux/slices/profile";

import Profiledb from "../assets/profiledb.webp";

export default function Personal() {
  const { request } = useApi();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Profile.value);

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobileno: "",
  });

  // fetch user
  useEffect(() => {
    async function fetchuser() {
      try {
        const response = await request({
          url: "/profile/getuser",
          method: "POST",
        });

        dispatch(setprofile(response.userdetails));
        setFormData({
          firstname: response.userdetails.firstname || "",
          lastname: response.userdetails.lastname || "",
          email: response.userdetails.email || "",
          mobileno: response.userdetails.mobileno || "",
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchuser();
  }, [request, dispatch]);

  // edit image click
  function handleEditClick() {
    fileInputRef.current.click();
  }

  // image select
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  }

  // upload image
  async function uploadProfileImage() {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("profile", selectedImage);

    try {
      setUploading(true);

      const response = await request({
        url: "/profile/upload",
        method: "POST",
        data: formDataUpload,
      });

      toast.success("Profile image updated successfully");
      dispatch(setprofile(response.updatedUser));

      // refresh user details
      setSelectedImage(null);
      setPreview(null);
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to update image");
    } finally {
      setUploading(false);
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const response = await request({
        url: "/profile/updateprofile",
        method: "PATCH",
        data: formData,
      });
      dispatch(setprofile(response.updatedUser));
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl">
      {/* Header Gradient */}
      <div className="h-40 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      {profile && Object.keys(profile).length > 0 && (
        <div className="relative px-5 sm:px-10 pb-10 sm:pb-12">
          {/* Profile Image Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20">
            <div className="relative group">
              <div className="relative overflow-hidden border-4 border-slate-900 rounded-full shadow-2xl h-32 w-32 sm:h-40 sm:w-40 bg-slate-800">
                <img
                  src={preview || (profile.userprofile ? `${BASE_URL}/${profile.userprofile}` : Profiledb)}
                  alt="profile"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay for Edit */}
                <div
                  onClick={handleEditClick}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/60 opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-sm"
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center sm:text-left mb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">@{profile.username}</h2>
                  <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Verified Profile</p>
                  </div>
                </div>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* User Details Form / Grid */}
          <form onSubmit={handleUpdateProfile} className="mt-12">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
              {[
                { label: "First Name", key: "firstname", placeholder: "Enter first name" },
                { label: "Last Name", key: "lastname", placeholder: "Enter last name" },
                { label: "Email Address", key: "email", placeholder: "Enter email", type: "email" },
                { label: "Phone Number", key: "mobileno", placeholder: "Enter phone number" },
              ].map((field) => (
                <div key={field.key} className="p-5 transition-all border border-white/5 rounded-2xl bg-white/5 group focus-within:bg-white/10 focus-within:border-indigo-500/50">
                  <label className="text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase ml-1 opacity-70">
                    {field.label}
                  </label>
                  {isEditing ? (
                    <input
                      type={field.type || "text"}
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full mt-2 bg-transparent text-lg font-bold text-white outline-none placeholder-slate-600"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <p className="mt-2 text-lg font-bold text-white tracking-wide truncate">
                      {profile[field.key] || "Not configured"}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-4 mt-8 animate-in slide-in-from-bottom-2 duration-300">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {uploading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      firstname: profile.firstname || "",
                      lastname: profile.lastname || "",
                      email: profile.email || "",
                      mobileno: profile.mobileno || "",
                    });
                  }}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          {/* Upload Button Section (Image only) */}
          {selectedImage && !isEditing && (
            <div className="mt-10 p-6 rounded-[32px] bg-indigo-500/10 border border-indigo-500/20 animate-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold">New Image Ready</p>
                    <p className="text-slate-400 text-xs">Ready to sync with your account</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => { setSelectedImage(null); setPreview(null); }}
                    className="flex-1 sm:flex-none px-6 py-3 font-bold text-slate-400 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={uploadProfileImage}
                    disabled={uploading}
                    className="flex-1 sm:flex-none px-8 py-3 font-black text-white rounded-2xl bg-indigo-500 hover:bg-indigo-600 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {uploading ? "Updating..." : "Confirm Sync"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}