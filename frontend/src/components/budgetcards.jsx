import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setTotalbudget} from "../redux/slices/totalbudgetslice"
import useapi from "../customehooks/useapi";
import { useContext } from "react";
import { userContext } from "../App";

function Budgetcards({ totalexpense }) {
  const Createbudget = useSelector((state) => state.Createbudget.value);
  const Totalbudget=useSelector((state)=>state.Totalbudget.value)
  const dispatch=useDispatch()
  const { request} = useapi();
  const {remainingbudget,setRemainingbudget}=useContext(userContext)
  
  const monthlydate = new Date();

  // Find salary entry in budget (find the latest one with a valid date)
  const filtersalarydate = Array.isArray(Createbudget) 
    ? [...Createbudget].reverse().find((item) => item.source === "Salary" && item.createddate)
    : null;

  let salarydateObj;

  if (filtersalarydate && filtersalarydate.createddate) {
    const createdDate = new Date(filtersalarydate.createddate);
    salarydateObj = new Date(createdDate);
    salarydateObj.setDate(createdDate.getDate() + 30);
  } else {
    salarydateObj = new Date();
    salarydateObj.setDate(salarydateObj.getDate() + 30);
  }

  salarydateObj.setHours(0, 0, 0, 0);
  monthlydate.setHours(0, 0, 0, 0);

  const remainingdays = salarydateObj - monthlydate;
  const remainingdaysinmonth = Math.ceil(remainingdays / (1000 * 60 * 60 * 24));

//use effect to calculate total amount in the card
  useEffect(()=>{
     async function totalamount(){
         try{
             const response=await request({
              url:'/budget/gettotalbudget',
              method:'GET',
            }) 
            console.log(response.totalbudget)
            if(response && response.totalbudget && Array.isArray(response.totalbudget)){
                dispatch(setTotalbudget(response.totalbudget))
            }
            else{
                dispatch(setTotalbudget([]))
            }
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
  },[totalamount,totalexpense])
     
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
            Rs.{totalamount>0?totalamount:0}
          </h5>
        </div>

       {/*total expense card */}
        <div className="border border-black bg-red-500 h-[150px] rounded">
          <h3 className="text-center mt-6 text-[24px] text-white">Expenses</h3>
          <h5 className="text-center text-[20px] text-white">
            Rs:{totalexpense>0?totalexpense:0}
          </h5>
        </div>

         {/*total remaining card */}
        <div className="border border-black bg-blue-500 h-[150px] rounded">
          <h3 className="text-center mt-6 text-[24px] text-white">Remaining</h3>
           <h5 className="text-center text-[20px] text-white">
            Rs:{remainingbudget>0?remainingbudget:0}  
          </h5>
        </div>

         {/*dates card */}
        <div className="border border-black bg-red-900 h-[150px] rounded">
          <h3 className="text-center mt-6 text-[24px] text-white">Date</h3>
          <h5 className="text-center text-[20px] text-white">{monthlydate.toDateString()}</h5>
          <p className="text-center text-[20px] text-white">Remaining days:{remainingdaysinmonth}</p> 
        </div>
      </div>
    </div>
  );
}
export default Budgetcards;
