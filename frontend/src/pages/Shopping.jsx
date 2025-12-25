import Createshopping from "../components/createshopping";
import { useContext } from "react";
import { userContext } from "../App";
import Viewshopping from "../components/viewshopping";
import Shoppinghistory from "../components/shoppinghistory";
import { useState } from "react";
function Shopping() {
  const { createshopping, viewshopping } = useContext(userContext);
  const [activeshopping, setActiveshopping] = useState("");

  return (
    <div>
      {createshopping && (
        <Createshopping
          activeshopping={activeshopping}
          setActiveshopping={setActiveshopping}
        />
      )}
      {viewshopping && (
        <Viewshopping
          activeshopping={activeshopping}
          setActiveshopping={setActiveshopping}
        />
      )}
      {activeshopping === "A" && (
        <Shoppinghistory
          activeshopping={activeshopping}
          setActiveshopping={setActiveshopping}
        />
      )}
    </div>
  );
}

export default Shopping;
