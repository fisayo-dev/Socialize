import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useRef } from "react";
import { useState, useEffect } from "react";

const Signup = () => {
  // Array of labels for each input field
  const labels1 = ["First Name ", "Last Name", "Middle Name"];

  const labels2 = ["Email Address", "Password", "Confirm Password"];

  // Create an array of refs for each input
  const inputRefs = Array.from({ length: labels1.length }, () => useRef(null));
  const [focusedInputIndexes, setFocusedInputIndexes] = useState(
    Array(labels1.length).fill(false)
  ); // Track focus for each input separately
  const inputRefs2 = Array.from({ length: labels1.length }, () => useRef(null));
  const [focusedInputIndexes2, setFocusedInputIndexes2] = useState(
    Array(labels2.length).fill(false)
  ); // Track focus for each input separately

  // Function to handle focus for a specific input
  const handleInputFocus = (index) => {
    const newFocusStates = [...focusedInputIndexes];
    newFocusStates[index] = true; // Set the focused input to true
    setFocusedInputIndexes(newFocusStates);
  };

  // Function to handle clicks outside each input and blur it
  const handleClickOutside = (event) => {
    const newFocusStates = [...focusedInputIndexes];
    inputRefs.forEach((inputRef, index) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        newFocusStates[index] = false; // Blur only the clicked outside input
      }
    });
    setFocusedInputIndexes(newFocusStates);
  };

  // Add an event listener to detect clicks outside each input
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [focusedInputIndexes]);

  const getInputType = (label) => {
    let correctInputType = "";
    if (label == "Password" || label == "Confirm Password") {
      correctInputType = "password";
    } else if (label == "Email Address") {
      correctInputType = "email";
    } else if (label == "age") {
      correctInputType = "number";
    }
    return correctInputType;
  };
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
              {/* {labels1.map((label, index) => (
                <div className="grid gap-1">
                  <div
                    key={index}
                    className={`relative flex gap-5 ${
                      focusedInputIndexes[index]
                        ? "border-slate-200"
                        : "border-slate-500"
                    } border-b-2 items-center text-[1rem] md:text-[1.12rem]`}
                  >
                    <h2
                      className={`${
                        focusedInputIndexes[index]
                          ? "focus-up-text"
                          : "focus-inp-text"
                      }`}
                    >
                      {label}
                    </h2>
                    <input
                      type={getInputType(label)}
                      className={`w-full py-4 `}
                      ref={inputRefs[index]}
                      onFocus={() => handleInputFocus(index)}
                    />
                  </div>
                  {focusedInputIndexes[index] && (
                    <p>This field cannot be empty</p>
                  )}
                </div>
              ))} */}

              <div className="grid gap-5">
                <div
                  className='relative flex gap-5 
                  items-center text-[1rem] md:text-[1.12rem]'
                >
                  <select className="select font-bold w-full border-2 rounded-lg border-slate-200 p-3 ">
                    <option value="">Male</option>
                    <option value="">Female</option>
                    <option value="">Others</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-5 py-5 items-center">
                <Button styles="">Next</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
