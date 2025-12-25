import About from "../components/About";
function Firstpage({ getstarted, setIsloggedin }) {
  return (
    <>
      <div className="bg-white bg-gradient-to-r from-[#84994F] to-[white]">
        <About getstarted={getstarted} setIsloggedin={setIsloggedin} />
      </div>
    </>
  );
}
export default Firstpage;
