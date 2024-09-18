import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Chats = () => {
  return (
    <div className="grid place-items-center h-[100vh]">
      <div className="grid gap-1 text-center">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Socialize
          </h2>
        </div>
          <p className="text-md text-slate-400">
            Choose a friend to start chatting.
          </p>
        <Link to="/" className="mt-1">
          <Button>Create Friend</Button>
        </Link>
      </div>
    </div>
  );
};

export default Chats;
