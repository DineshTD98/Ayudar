import { useState } from "react";
import Viewdocuments from "../components/viewdocuments";
import { Outlet } from "react-router-dom";
function Documents(){
    const [reload,setReload]=useState(false)
    return(
        <>
          <div>
             <Viewdocuments/>
             <Outlet>
                context={{
                    reload,
                    setReload
                }}
             </Outlet>
          </div>
        </>
    )
}
export default Documents;