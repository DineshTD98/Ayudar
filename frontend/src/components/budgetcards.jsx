import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setTotalbudget} from "../redux/slices/totalbudgetslice"
import useapi from "../customehooks/useapi";
import { useContext } from "react";
import { userContext } from "../App";


function Budgetcards({ totalexpense }) {
  const Totalbudget=useSelector((state)=>state.Totalbudget.value)
  const dispatch=useDispatch()
  const { request, error, loading } = useapi();
  const {remainingbudget,setRemainingbudget}=useContext(userContext)

//use effect to calculate total amount in the card
  useEffect(()=>{
     async function totalamount(){
         try{
             const response=await request({
              url:'/budget/gettotalbudget',
              method:'GET',
            }) 
            console.log(response.totalbudget)
            dispatch(setTotalbudget(response.totalbudget))
           
         }
         catch(err){
            console.log(err.message)
         }
     }
     totalamount()
  },[])

 // total amount calculation using redux

  const totalamount = Array.isArray(Totalbudget) 
    ? Totalbudget.reduce((sum, item) => sum + Number(item.nettotal || 0), 0)
    : 0;

// set remaining amount from budget
  
  useEffect(()=>{
      setRemainingbudget(()=>{
          const totalremaining=totalamount - totalexpense
          return totalremaining;
      })
  },[])
     
  return (
    <div>
      {/* <div className="w-full h-[100px] text-center mt-6">
              <button className="border border-green-800 text-[20px] m-6 p-1 rounded">Add a Expanse</button>
              <button className="border border-green-800 text-[20px] m-6 p-1 rounded">View months</button>
              <button className="border border-green-800 text-[20px] m-6 p-1 rounded">Create new budget</button>
          </div> */}

      {/*total amount card */}
      <div className="grid grid-cols-4 gap-4 mt-10 ms-10 mr-10">
        <div className="border border-black bg-green-500 h-[150px] rounded">
          <h3 className="text-center mt-6 text-[24px] text-white">
            Total Amount
          </h3>
          <h5 className="text-center text-[24px] text-white">
            Rs.{totalamount}
          </h5>
        </div>

       {/*total expense card */}
        <div className="border border-black bg-red-500 h-[150px] rounded">
          <h3 className="text-center mt-6 text-[24px] text-white">Expenses</h3>
          <h5 className="text-center text-[20px] text-white">
            Rs:{totalexpense}
          </h5>
        </div>

         {/*total remaining card */}
        <div className="border border-black bg-blue-500 h-[150px] rounded">
          <h3 className="text-center mt-6 text-[24px] text-white">Remaining</h3>
           <h5 className="text-center text-[20px] text-white">
            Rs:{remainingbudget}
          </h5>
        </div>

         {/*dates card */}
        <div className="border border-black bg-red-900 h-[150px] rounded">
          <h3 className="text-center mt-6 text-[24px] text-white">Date</h3>
        </div>
      </div>
    </div>
  );
}
export default Budgetcards;
