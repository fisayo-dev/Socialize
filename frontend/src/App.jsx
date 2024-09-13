import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState,useEffect } from "react";
import { Landing } from "./pages/App";
import { PageNotFound } from "./pages";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api") // Make the request to the backend
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log(err));
  },[]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Landing message={message} />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
