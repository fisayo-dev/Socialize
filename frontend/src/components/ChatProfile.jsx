import { useParams } from "react-router-dom";
import { FaBridgeLock, FaFootball } from "react-icons/fa6";

const ChatProfile = () => {
  const { id } = useParams();
  return (
    <div className="app-dark-bg-color h-[100vh]">
      <div className="grid gap-10 py-5 justify-center">
        <div className="grid text-center gap-1">
          <img src="/vite.svg" alt="" className="mx-auto w-20" />
          <h2 className="text-3xl font-bold">Fisayo</h2>
          <h2 className="text-sm">olufisayo@gmail.com</h2>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="grid p-4 rounded-lg cursor-pointer hover:bg-slate-800 gap-2 place-items-center">
            <FaBridgeLock className="text-3xl" />
            <p className="text-sm">Block</p>
          </div>
          <div className="grid p-4 rounded-lg cursor-pointer hover:bg-slate-800 gap-2 place-items-center">
            <FaFootball className="text-3xl" />
            <p className="text-sm">Unfriend</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Joined: 03/04/2024</p>
        </div>
      </div>
    </div>
  );
};

export default ChatProfile;
