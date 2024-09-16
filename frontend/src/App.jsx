import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Landing, Login, Signup } from "./pages/App";
import { ChatLayout } from "./layouts";
import { PageNotFound } from "./pages";
import { Chats, ChatsId } from "./pages/User";

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
        <Route path="" element={<ChatLayout />}>
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<ChatsId />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
