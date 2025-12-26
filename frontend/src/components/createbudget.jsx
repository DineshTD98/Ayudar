import { useEffect, useState } from "react";
import { setCreatebudget } from "../redux/slices/createbudgetslice";
import { useDispatch, useSelector } from "react-redux";
import useapi from "../customehooks/useapi";

function Createbudget({ creditcardamount, setCreditcardamount }) {
  const Createbudget = useSelector((state) => state.Createbudget.value);
  const { request, error, loading } = useapi();
  const [creditcard, setCreditcard] = useState("");
  const dispatch = useDispatch();
  const [nettotal, setNettotal] = useState(0);
 
 // form state creation to add the budget
  const [form, setForm] = useState({
    amount: "",
    createddate: "",
    source: "",
  });

  // form to add the credit card budget
  const [creditcardform, setcreditcardForm] = useState({
    creditcardname: "",
    interest: "",
    limit: "",
    duedate: "",
  });

  //budget form handle
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // credit card form handle 
  const handlecreditchange = (e) => {
    setcreditcardForm({ ...creditcardform, [e.target.name]: e.target.value });
  };


  // generate button handle
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        url: "/budget/createbudget",
        method: "post",
        data: form,
        headers: { "content-type": "application/json" },
      });
      console.log(response.Createdbudget);
      dispatch(setCreatebudget([...Createbudget, response.Createdbudget]));
    } catch (err) {
      console.log(err.message);
    }
  };

 //useeffect to add amount to the nettotal 
  useEffect(() => {
    setNettotal(
      Number(creditcardamount || 0) +
        Number(
          Createbudget.length > 0
            ? Createbudget[Createbudget.length - 1].amount
            : 0,
        ),
    );
  }, [Createbudget, creditcardamount]);


  // add button to handle the credit card
  const handlecreditsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        url: "/budget/creditbudget",
        method: "post",
        data: creditcardform,
      });
      console.log(response.creditbudget);
      setCreditcardamount(response.creditbudget.limit);
    } catch (err) {
      return console.log(err.message);
    }
  };

  // creating the total budget

  const handleamount=async()=>{
      try{
          const response=await request({
            url:'/budget/monthlybudget',
            method:'post',
            data:{nettotal}
          })
          console.log(response.activebudget)
          setCreatebudget('')
          setCreditcardamount('')
          setNettotal('')
      }
      catch(err){
        console.log(err.message)
      }
  }

  return (
    <div>
      
      <h1 className="text-center font-bold text-[24px] mt-10 mb-10">
        Create your budget here
      </h1>


      <div className="flex justify-center  items-start gap-3">
        <div className="flex flex-col border border-green-800">
          {/*budget creation form */}
          <form
            action=""
            className={`w-[500px]  rounded flex flex-col origin-top overflow-hidden ${creditcard === "yes" ? "max-h-[2000px]" : "min-h-[200px]"} transition-all duration-800`}
            onSubmit={(e) => handlesubmit(e)}
          >
            <h1 className="text-center bg-green-800 w-[250px] h-[30px] ms-32 text-white font-bold  p-1 rounded mb-3 ">
              Add a new budget
            </h1>
            <div className="mb-3 mt-3">
              <label
                htmlFor=""
                className="inline-block w-[200px] ms-10 font-bold"
              >
                Amount
              </label>
              <input
                type="number"
                className="inline-block w-[250px] border border-black"
                name="amount"
                value={form.amount}
                onChange={handlechange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor=""
                className="inline-block w-[200px] font-bold ms-10"
              >
                Created date{" "}
              </label>
              <input
                type="date"
                className="inline-block w-[250px] border border-black"
                name="createddate"
                value={form.createddate}
                onChange={handlechange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="source"
                className="inline-block font-bold w-[200px] ms-10"
              >
                Source
              </label>
              <select
                name="source"
                id=""
                className="inline-block w-[250px]"
                value={form.source}
                onChange={handlechange}
              >
                <option value="" disabled>
                  Select the source of income
                </option>
                <option value="Salary">Salary</option>
                <option value="Family income">Family income</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="border border-green-800 bg-green-800 p-1 rounded text-white"
              >
                Generate
              </button>
            </div>
          </form>


          {/*credit card budget creation form */}
          <div>
            <form action="" onSubmit={(e) => handlecreditsubmit(e)}>
              <h1 className="text-center font-bold text-[24px] mt-10 mb-10">
                Credit card details
              </h1>
              <div>
                <label
                  htmlFor=""
                  className="inline-block font-bold w-[200px] ms-10"
                >
                  New credit card
                </label>
                <select
                  name=""
                  id=""
                  value={creditcard}
                  onChange={(e) => setCreditcard(e.target.value)}
                  className="inline-block w-[250px]"
                >
                  <option value="" disabled>
                    Choose yes or no
                  </option>
                  <option value="yes">YES</option>
                  <option value="no">NO</option>
                </select>
              </div>
              {creditcard === "yes" && (
                <div className="m-7 border border-green-800 bg-green-200 p-2">
                  <div>
                    <label
                      htmlFor=""
                      className="w-[150px] font-bold inline-block mb-3"
                    >
                      Credit card name
                    </label>
                    <input
                      type="text"
                      className="inline-block w-[250px] border border-black "
                      name="creditcardname"
                      value={creditcardform.creditcardname}
                      onChange={handlecreditchange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="w-[150px] font-bold inline-block mb-3"
                    >
                      Limit
                    </label>
                    <input
                      type="number"
                      className="inline-block w-[250px] border border-black "
                      onChange={handlecreditchange}
                      name="limit"
                      value={creditcardform.limit}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="w-[150px] font-bold inline-block mb-3"
                    >
                      Interest
                    </label>
                    <input
                      type="text"
                      className="inline-block w-[250px] border border-black "
                      onChange={handlecreditchange}
                      name="interest"
                      value={creditcardform.interest}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="w-[150px] font-bold inline-block mb-3"
                    >
                      Due date
                    </label>
                    <input
                      type="date"
                      className="inline-block w-[250px] border border-black "
                      onChange={handlecreditchange}
                      name="duedate"
                      value={creditcardform.duedate}
                    />
                  </div>
                </div>
              )}

              <div className="text-center mt-6">
                <button className="bg-yellow-600 rounded text-white w-20 p-1 mb-3">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>


        {/*calculating net total section */}
        <div className="w-[500px] border border-green-800  h-[400px] rounded flex flex-col">
          <div className="mb-3 mt-10 flex">
            <label
              htmlFor=""
              className="inline-block w-[200px] font-bold"
            >
              Income source amount
            </label>
            <span className="inline-block w-[200px] text-center border border-black">
              {Createbudget.length > 0
                ? Createbudget[Createbudget.length - 1].amount
                : 0}
            </span>
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="inline-block w-[200px] font-bold"
            >
              Credit card amount
            </label>
            <span className="inline-block w-[200px] font-bold text-black text-center border border-black">
              {creditcardamount}
            </span>
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="inline-block w-[200px]   mb-3 font-bold"
            >
              Net Total
            </label>
            <span className="inline-block w-[200px] bg-black text-white text-center border border-black">
              {nettotal}
            </span>
          </div>
          <div className="text-right mr-10">
            <button className="bg-blue-600 m-6 p-1 rounded text-white"
              onClick={handleamount}
             >
              save changes
            </button>
            <button className="bg-red-600 p-1 rounded text-white">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Createbudget;
