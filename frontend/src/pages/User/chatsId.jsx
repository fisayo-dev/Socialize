import { useParams } from "react-router-dom";

const ChatsId = () => {
  const { id } = useParams();
  return <div>ChatsId {id}</div>;
};

export default ChatsId;
