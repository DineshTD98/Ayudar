import { useEffect, useRef, useState } from "react";
import useApi from "../customehooks/useapi";
import { useDispatch, useSelector } from "react-redux";
import { setprofile } from "../redux/slices/profile";

import Profiledb from "../assets/profiledb.webp";
import Editimage from "../assets/editimageprofile.jpg";

export default function Personal() {
  const { request } = useApi();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Profile.value);

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // fetch user
  useEffect(() => {
    async function fetchuser() {
      try {
        const response = await request({
          url: "/profile/getuser",
          method: "POST",
        });

        dispatch(setprofile(response.userdetails));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchuser();
  }, []);

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
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profile", selectedImage);

    try {
      setUploading(true);

      const response = await request({
        url: "/profile/upload",
        method: "POST",
        data: formData,
       });
      
      alert("Profile image updated successfully");
      dispatch(setprofile(response.updatedUser));
      
      // refresh user details
      setSelectedImage(null);
      setPreview(null);
      
    } catch (err) {
      console.log(err.message);
    } finally {
      setUploading(false);
    }
  }
  
  const BASE_URL = import.meta.env.VITE_API_URL;  

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
      {/* Header Gradient */}
      <div className="h-32 bg-gradient-to-r from-green-600 to-green-200"></div>

      {profile && Object.keys(profile).length > 0 && (
        <div className="relative px-6 pb-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center -mt-16">
            <div className="relative group">
              <div className="relative overflow-hidden border-4 border-white rounded-full shadow-lg h-32 w-32 bg-gray-50">
                <img
                  src={preview || (profile.userprofile ? `${BASE_URL}/${profile.userprofile}` : Profiledb)}
                  alt="profile"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay for Edit */}
                <div 
                  onClick={handleEditClick}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <img src={Editimage} alt="edit" className="w-8 h-8 brightness-0 invert" />
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

            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-800">@{profile.username}</h2>
              <p className="text-gray-500 font-medium">Personal Account</p>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            <div className="p-4 transition-all border border-gray-50 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md">
              <label className="text-xs font-bold tracking-wider text-indigo-600 uppercase">First Name</label>
              <p className="mt-1 text-lg font-semibold text-gray-700">{profile.firstname || 'Not set'}</p>
            </div>

            <div className="p-4 transition-all border border-gray-50 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md">
              <label className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Last Name</label>
              <p className="mt-1 text-lg font-semibold text-gray-700">{profile.lastname || 'Not set'}</p>
            </div>

            <div className="p-4 transition-all border border-gray-50 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md">
              <label className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Email Address</label>
              <p className="mt-1 text-lg font-semibold text-gray-700 truncate">{profile.email || 'Not set'}</p>
            </div>

            <div className="p-4 transition-all border border-gray-50 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md">
              <label className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Phone Number</label>
              <p className="mt-1 text-lg font-semibold text-gray-700">{profile.mobileno || 'Not set'}</p>
            </div>
          </div>

          {/* Upload Button */}
          {selectedImage && (
            <div className="flex flex-col items-center mt-10 space-y-3 animate-in fade-in slide-in-from-bottom-4">
              <p className="text-sm text-amber-600 font-medium italic">New image selected!</p>
              <button
                onClick={uploadProfileImage}
                disabled={uploading}
                className="w-full max-w-xs px-8 py-3 font-bold text-white transition-all transform rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {uploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 animate-spin text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : "Save Changes"}
              </button>
              <button 
                onClick={() => {setSelectedImage(null); setPreview(null);}}
                className="text-sm font-medium text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}