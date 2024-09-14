import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaUserLarge,
  FaPerson,
  FaEnvelope,
  FaKey,
  FaGlobe,
  FaCalendarCheck,
  FaCalendar,
} from "react-icons/fa6";

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
          <div className="grid gap-10 ">
            <h2 className="text-center text-4xl font-bold">SignUp</h2>
            <form
              name="signup_form"
              id="signup_form"
              className="w-full grid gap-6 md:w-2/4 mx-auto"
            >
              <div className="grid gap-4">
                <div className="form-styles">
                  <FaUserLarge />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-styles">
                  <FaUser />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Middle Name"
                  />
                </div>
                <div className="form-styles">
                  <FaUser />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-styles">
                  <FaPerson />
                  <select name="" id="" className="select w-full">
                    <option value="">--Select Gender--</option>
                    <option value="">Male</option>
                    <option value="">Female</option>
                    <option value="">Others</option>
                  </select>
                </div>
                <div className="form-styles">
                  <FaGlobe />
                  <select name="" id="" className="select w-full">
                    <option value="">--Select Country--</option>
                    <option value="">Nigeria</option>
                    <option value="">Cameroon</option>
                    <option value="">Chad</option>
                  </select>
                </div>
                <div className="form-styles">
                  <FaCalendar />
                  <input type="date" className="w-full" placeholder="Date of Birth"/>
                </div>
                <div className="form-styles">
                  <FaEnvelope />
                  <input
                    className="w-full"
                    type="email"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-styles">
                  <FaKey />
                  <input
                    className="w-full"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-styles">
                  <FaKey />
                  <input
                    className="w-full"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="grid py-5 items-center ml-auto w-full">
                <Button>Next</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
