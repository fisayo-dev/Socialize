import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Landing } from "./pages/App";
import { PageNotFound } from "./pages";
function App() {
  const [message, setMessage] = useState("");

  const fetchMainText = async () => {
    try {
      const res = await fetch("/api"); // Make the request to the backend
      const { message } = await res.json();
      setMessage(message);
      fetchMainText(); //Long-pulling logic
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    fetchMainText();
  }, []);
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
