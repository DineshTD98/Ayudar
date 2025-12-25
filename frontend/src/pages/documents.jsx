import Uploaddocuments from "../components/uploaddocuments";
import Viewdocuments from "../components/viewdocuments";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { setDocument } from "../redux/slices/documentslice";
import { useDispatch } from "react-redux";
import useapi from "../customehooks/useapi";

function Document() {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const { opendocuments, viewdocuments } = useContext(userContext);
  const { request, error, loading } = useapi();
  useEffect(() => {
    async function documentfetch() {
      try {
        const response = await request({
          url: "/documents/getdocument",
          method: "GET",
        });
        console.log(response);
        if (Array.isArray(response.document)) {
          dispatch(setDocument(response.document));
          console.log(response);
        } else {
          dispatch(setDocument([]));
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    documentfetch();
  }, [reload]);
  return (
    <>
      <div className="bg-white min-h-[750px] max-h-fit w-full">
        {opendocuments && <Uploaddocuments setReload={setReload} />}
        {viewdocuments && <Viewdocuments />}
      </div>
    </>
  );
}
export default Document;
