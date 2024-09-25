import { useEffect } from "react";
import { Button, Header, Footer } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Landing = ({ message = "" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chats");
    }
  }, [user,navigate]);
  return (
    <div className="grid h-[100vh] ">
      <Header />
      <div className="app-container">
        <div className="grid justify-items-center place-items-center h-full px-4 md:px-10">
          <div className="mx-auto md:w-4/5 gap-4 grid text-center justify-items-center">
            <h2 className="text-4xl md:text-5xl font-bold">{message}</h2>
            <p className="text-1xl">
              Get in touch with your friends and families from any distance.
            </p>
            <Link to="/signup">
              <Button styles="app-dark-text-color ">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
