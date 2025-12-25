import Login from "../components/login";

import Signuppage from "../components/signuppage";

function Loginpage({ setIsloggedin, isloggedin, setGetstarted }) {
  return (
    <>
      <div className="loginpage">
        {!isloggedin && (
          <Login setIsloggedin={setIsloggedin} setGetstarted={setGetstarted} />
        )}
        {isloggedin && <Signuppage setIsloggedin={setIsloggedin} />}
      </div>
    </>
  );
}
export default Loginpage;
