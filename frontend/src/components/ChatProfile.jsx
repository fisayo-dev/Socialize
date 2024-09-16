import { useParams } from "react-router-dom";

const ChatProfile = () => {
  const { id } = useParams();
  return <div className="grid bg-black bg-opacity-20 h-[100vh]">ChatProfile - {id}</div>;
};

export default ChatProfile;
