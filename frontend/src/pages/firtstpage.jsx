import { Outlet } from "react-router-dom";
function Firstpage({ getstarted, setIsloggedin }) {
  return (
    <>
      <div>
        <Outlet
           context={{
              getstarted,
              setIsloggedin
           }}
        />
      </div>
    </>
  );
}
export default Firstpage;
