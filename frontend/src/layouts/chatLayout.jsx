import { Outlet } from "react-router-dom";
import { ChatProfile, ChatSidebar } from "../components";
const ChatLayout = () => {
  return (
    <div className="chats-app-flex">
      <ChatSidebar />
      <Outlet />
      <ChatProfile />
    </div>
  );
};

export default ChatLayout;
