import { FaEnvelope, FaKey, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "../../components";

const Signup = () => {
  return (
    <div className="app-container">
      <Link
        to="/"
        className="py-10 items-center justify-center text-center flex"
      >
        <h1 className="text-1xl font-bold">Socialize</h1>
      </Link>
      <div className="w-full mx-auto">
        <div className="grid py-5">
          <div className="grid gap-5 ">
            <h2 className="text-center text-4xl font-bold">
              Let's get to know you ?
            </h2>
            <form
              name="signup_form"
              id="signup_form"
              className="w-full grid gap-6 md:w-2/4 mx-auto"
            >
              <div className="flex gap-5 border-slate-400 border-b-2 items-center">
                <input
                  type="text"
                  className="w-full py-4 text-[1rem] md:text-[1.12rem]"
                />
              </div>
              <div className="flex gap-5 border-slate-400 border-b-2 items-center">
                <input
                  type="text"
                  className="w-full py-4 text-[1rem] md:text-[1.12rem]"
                />
              </div>
              <div className="flex gap-5 border-slate-400 border-b-2 items-center">
                <input
                  type="email"
                  className="w-full py-4 text-[1rem] md:text-[1.12rem]"
                />
              </div>
              <div className="flex gap-5 border-slate-400 border-b-2 items-center">
                <input
                  type="password"
                  className="w-full py-4 text-[1rem] md:text-[1.12rem]"
                />
              </div>
              <Button>Next</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
