import { useState } from "react";
import { Outlet } from "react-router-dom";
function Documents(){
    const [reload,setReload]=useState(false)
    return(
        <>
          <div>
             <Outlet context={{
                    reload,
                    setReload
                }} />
          </div>
        </>
    )
}
export default Documents;