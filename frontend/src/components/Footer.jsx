import { FaFacebookF, FaXTwitter, FaGithub } from "react-icons/fa6";
import {SiDailydotdev} from 'react-icons/si'
const Footer = () => {
  return (
    <div className="bottom-0 w-full">
      <div className="app-container backdrop-blur-md ">
        <div className="py-10 items-center justify-cente r justify-items-center gap-3 md:gap-10 grid md:flex">
          <h1 className="font-bold">All rights reserved </h1>
          <div className="flex gap-6 items-center">
            <p>Developer</p>
           <p>||</p>
            <div className="flex gap-2 items-center">
              <FaXTwitter className="w-6 h-6" />
              <FaFacebookF className="w-6 h-6" />
              <FaGithub className="w-6 h-6" />
              <SiDailydotdev className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
