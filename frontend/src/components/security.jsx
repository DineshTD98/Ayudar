import { useDispatch } from "react-redux";
import { setprofile } from "../redux/slices/profile";
import { useState } from "react";
import useApi from "../customehooks/useapi";

export default function Security() {
  const dispatch = useDispatch();
   const {request} = useApi();
   const [newusername,setUsername]=useState('')
   const [openinput,setOpeninput]=useState(false);

   const [newpassword,setNewpassword]=useState('')
   const [openpassword,setOpenpassword]=useState(false);

  const handleusername = async() => {
    setOpeninput(false);
   try {
        const response = await request({
            url: "/profile/updateusername",
            method: "PATCH",
            data: { newusername }
          })
          alert("Username updated successfully");
          dispatch(setprofile(response.updatedUser));
    } catch (error) {
        console.log(error)
    }
  }

  const handlepassword = async() => {
    setOpenpassword(false);
   try {
        const response = await request({
            url: "/profile/updatepassword",
            method: "PATCH",
            data: { newpassword }
          })
          alert("Password updated successfully");
          dispatch(setprofile(response.updatedUser));
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Security</h3>

      {!openinput? <button className="block lg:w-1/2 md:w-1/2 w-full text-left p-3 border rounded mb-3 hover:bg-green-800 hover:text-white"
       type="button"
       onClick={()=>setOpeninput(true)}>
         Update username
      </button>:
      <div>
       <input type="text" value={newusername} onChange={(e)=>setUsername(e.target.value)} className="block lg:w-1/2 md:w-1/2 w-full text-left p-3 border rounded mb-3 hover:bg-green-800 hover:text-white "/>
       <button className="block lg:w-1/2 md:w-1/2 w-full text-left p-3 border rounded mb-3 hover:bg-green-800 hover:text-white "
       onClick={handleusername}
       >Save</button>
       </div>
       }

      {!openpassword? <button className="block lg:w-1/2 md:w-1/2 w-full text-left p-3 border rounded mb-3 hover:bg-green-800 hover:text-white "
       type="button"
       onClick={()=>setOpenpassword(true)}
      > 
        Change Password
      </button>:
      <div>
       <input type="text" value={newpassword} onChange={(e)=>setNewpassword(e.target.value)} className="block lg:w-1/2 md:w-1/2 w-full text-left p-3 border rounded mb-3 hover:bg-green-800 hover:text-white "/>
       <button className="block lg:w-1/2 md:w-1/2 w-full text-left p-3 border rounded mb-3 hover:bg-green-800 hover:text-white "
       onClick={handlepassword}
       >Save</button>
       </div>
       }

      <button className="block lg:w-1/2 md:w-1/2 w-full text-left p-3 border border-red-300 text-red-600 rounded hover:bg-red-800 hover:text-white ">
        Delete Account
      </button>
    </div>
  );
}