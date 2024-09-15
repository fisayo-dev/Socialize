import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Landing, Login, Signup } from "./pages/App";
import { PageNotFound } from "./pages";
function App() {
  const [message, setMessage] = useState("");

  const fetchMainText = async () => {
    const res = await fetch("/api"); // Make the request to the backend
    const data = await res.json();
    setMessage(data.message);
  };
  useEffect(() => {
    fetchMainText();
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Landing message={message} />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
