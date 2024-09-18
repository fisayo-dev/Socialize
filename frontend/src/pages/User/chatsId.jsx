import { useParams } from "react-router-dom";
import { FaUser, FaExclamation, FaImage } from "react-icons/fa6";

const ChatsId = () => {
  const { id } = useParams();
  return (
    <>
      <div className="chats-msg-grid h-[100vh]">
        <div className="bg-transparent border-b  border-slate-500 px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="text-2xl ">
                <FaUser />
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">Fisayo</h2>
                <p className="text-sm">email@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaExclamation />
            </div>
          </div>
        </div>
        <div className="bg-transparent py-2 px-4"></div>
        <div className="bg-transparent p-4">
          <div className="flex items-center  rounded-lg py-3 text-slate-400 bg-slate-800">
            <div className="px-4 text-[1.5rem]">
              <FaImage />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Type a message."
                className="text-slate-200 w-full"
              />
            </div>
            <div className="px-4 hover:font-bold cursor-pointer rounded-lg bg-slate-800">
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatsId;
