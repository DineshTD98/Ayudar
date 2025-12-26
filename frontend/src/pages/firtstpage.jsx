import { Outlet } from "react-router-dom";
function Firstpage({ getstarted, setIsloggedin }) {
  return (
    <>
      <div>
        <Outlet>
           context={{
              getstarted,
              setIsloggedin
           }}
        </Outlet>
      </div>
    </>
  );
}
export default Firstpage;
