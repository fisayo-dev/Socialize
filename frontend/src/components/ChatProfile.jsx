import { useParams } from "react-router-dom";

const ChatProfile = () => {
  const { id } = useParams();
  return <div>ChatProfile - {id}</div>;
};

export default ChatProfile;
