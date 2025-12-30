import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../customehooks/useapi";

function Createshopping() {

  const [editQty,setEditQty]=useState('')
  const [editIndex,setEditIndex]=useState(null)

  const [form, setForm] = useState({
    Slno: "",
    productname: "",
    quantity: "",
  });
  const {request,error,loading}=useApi()
  const navigate=useNavigate();
  const [list, setList] = useState([]);

  

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const exists = list.some(
      (item) => item.productname.toLowerCase() === form.productname.toLowerCase()
    );

    if (!exists) {
       setList([...list, form]);
       setForm({ Slno: "", productname: "", quantity: "" });
    }
  else{
    alert("item already exists")
  }
}
  const keys = Object.keys(form);
  keys.push("update");
  keys.push("Delete");
  

  // handle update

  const handleUpdateClick=(index,quantity)=>{
       setEditQty(quantity)
       setEditIndex(index)
  }

  const handlenewqnty=(index)=>{
    const updated=list.map((item,i)=>i===index?{...item,quantity:editQty}:item)
    setList(updated)
    setEditIndex(null)
    setEditQty('')
   } 

  const handledelete=(index)=>{
      const updated=list.filter((_,i)=>i !== index)
      setList(updated)
  }

 const handlesave =async() => {
      alert("url is triggered")
      try{
         const response=await request({
           url:'/shopping/createshopping',
           method:"post",
           data:list
         })
        setList([])
        console.log(response.shoppinglist)
      }
      catch(err){
          console.log(err.message)
      }
  };

return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h1 className="font-bold lg:text-[28px] md:text-5xl bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
                  Shopping List
                </h1>
                <p className="text-green-700 mt-2 text-md">Create and manage your shopping items</p>
              </div>
            </div>
          </div>
          
          <button
            className="group relative inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold text-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 hover:from-emerald-700 hover:to-green-700"
            onClick={() =>{ navigate('/shopping/shoppinghistory'),
               localStorage.setItem("currentpage","shoppinghistory")
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            View History
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          {/* Form Section */}
          <div className="w-full bg-white p-8 rounded-2xl shadow-lg border border-green-800">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-2 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New Item
              </h2>
              <p className="text-black">Fill in the details below to add an item to your list</p>
            </div>

            <form onSubmit={handlesubmit}>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="productname" className="block mb-2 font-medium text-green-700 text-lg">
                    Product Name
                  </label>
                   <input
                      type="text"
                      required
                      name="productname"
                      value={form.productname}
                      onChange={handlechange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-green-900 rounded-xl focus:border-green-900 focus:ring-opacity-50 focus:outline-none transition-colors text-lg"
                      placeholder="Enter product name"
                    />
                </div>

                <div className="group">
                  <label htmlFor="quantity" className="block mb-2 font-medium text-green-700 text-lg">
                    Quantity
                  </label>
                  <input
                     type="text"
                      required
                      name="quantity"
                      value={form.quantity}
                      onChange={handlechange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-green-900 rounded-xl focus:border-green-900  focus:outline-none transition-colors text-lg"
                      placeholder="e.g., 2 kg, 5 pieces"
                    />
                  
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3.5 px-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                      Add to List
                </button>
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="w-full bg-white p-2 rounded-2xl shadow-lg border border-green-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-green-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Your Shopping List
                <span className="ml-3 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {list.length} items
                </span>
              </h2>
              
              {list.length > 0 && (
                <button
                  onClick={() => handlesave()}
                  className="bg-gradient-to-r from-amber-700 to-yellow-600 text-white font-bold px-5 py-2.5 rounded-xl hover:shadow-lg hover:from-amber-500 hover:to-yellow-600 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                  </svg>
                  Save List
                </button>
              )}
            </div>

            {list.length === 0 ? (
              <div className="text-center py-16 rounded-xl border-2 border-dashed border-green-900">
                <svg className="w-16 h-16 mx-auto text-red-900 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-black mb-2">Your list is empty</h3>
                <p className="text-black">Start by adding items using the form on the left</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-green-900">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <tr>
                      {keys.map((heading, index) => (
                        <th
                          key={index}
                          className="px-6 py-4 text-left text-sm font-semibold text-green-900 uppercase tracking-wider border-b border-green-200"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-100">
                    {list.map((item, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-green-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex bg-black items-center justify-center mr-3">
                              <span className="text-sm font-semibold text-white">{index + 1}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-lg text-lg text-black">{item.productname}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                         {editIndex === index ? (
                                <input
                                  type="text"
                                  value={editQty}
                                  onChange={(e) => setEditQty(e.target.value)}
                                />
                              ) : (
                                item.quantity
                              )}
                        </td>
                        
                       <td>
                            {editIndex === index ? (
                              <button onClick={() =>handlenewqnty(index)}>
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleUpdateClick(index, item.quantity)
                                }
                                className="border border-green-700 text-white bg-black text-center font-bold px-4 py-2 rounded-lg"
                              >
                                Update
                              </button>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handledelete(index)}
                            className="inline-flex font-bold items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-200 to-red-250 text-red-700 rounded-lg hover:from-red-200 hover:to-red-100 hover:text-red-800 transition-all duration-200 border border-red-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);

}

export default Createshopping;