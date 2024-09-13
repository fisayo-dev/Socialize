import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useRef } from "react";
import { useState, useEffect } from "react";

const Signup = () => {
  // Array of labels for each input field
  const labels1 = ["First Name ", "Last Name", "Middle Name"];
  const labels2 = ["Email Address", "Password", "Confirm Password"];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [errorInputIndex1, setErrorInputIndex1] = useState(
    Array(labels1.length).fill(false)
  );
  const [errorInputIndex2, setErrorInputIndex2] = useState(
    Array(labels2.length).fill(false)
  );

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
      // Prevent blur if input is filled
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        inputRef.current.value.trim() === ""
      ) {
        newFocusStates[index] = false; // Blur only if input is empty
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

  // Function to validate inputs on clicking "Next"
  const handleNextClick = (e) => {
    e.preventDefault();
    const currentErrors = [...errorInputIndex1];
    let hasError = false;

    inputRefs.forEach((inputRef, index) => {
      if (inputRef.current && inputRef.current.value.trim() === "") {
        currentErrors[index] = true; // Mark error for empty input
        hasError = true;
      } else {
        currentErrors[index] = false; // No error if filled
        setCurrentPageIndex(1);
      }

      if (currentPageIndex == 1) {
        setCurrentPageIndex(2);
      }
      if (currentPageIndex == 2) {
        setCurrentPageIndex(3);
      }
    });

    setErrorInputIndex1(currentErrors);

    // Proceed if there are no errors
    if (!hasError) {
      console.log("All inputs are filled. Proceed to the next step.");
      // You can add your next step logic here
    }
  };

  const getInputType = (label) => {
    let correctInputType = "";
    if (label === "Password" || label === "Confirm Password") {
      correctInputType = "password";
    } else if (label === "Email Address") {
      correctInputType = "email";
    } else if (label === "age") {
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
              {currentPageIndex == 0 &&
                labels1.map((label, index) => (
                  <div key={index} className="grid gap-5">
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
                        onChange={(e) => {
                          const current = [...errorInputIndex1];
                          if (e.target.value.trim() === "") {
                            current[index] = true;
                            setErrorInputIndex1(current);
                          } else {
                            current[index] = false;
                            setErrorInputIndex1(current);
                          }
                        }}
                      />
                    </div>
                    {errorInputIndex1[index] && (
                      <p className="text-red-300">This field cannot be empty</p>
                    )}
                  </div>
                ))}

              {currentPageIndex == 1 && (
                <div
                  className="relative flex gap-5 
                  items-center text-[1rem] md:text-[1.12rem]"
                >
                  <select className="select font-bold w-full border-2 rounded-lg border-slate-200 p-3 ">
                    <option value="">Male</option>
                    <option value="">Female</option>
                    <option value="">Others</option>
                  </select>
                </div>
              )}
              {currentPageIndex == 2 && (
                <div
                  className="relative flex gap-5 
                items-center text-[1rem] md:text-[1.12rem]"
                >
                  <select className="select font-bold w-full border-2 rounded-lg border-slate-200 p-3 ">
                    <option value="">Nigeria</option>
                    <option value="">Ukraine</option>
                    <option value="">Russia</option>
                    <option value="">Ghana</option>
                    <option value="">Liberia</option>
                  </select>
                </div>
              )}

              {currentPageIndex == 3 &&
                labels2.map((label, index) => (
                  <div key={index} className="grid gap-5">
                    <div
                      key={index}
                      className={`relative flex gap-5 ${
                        focusedInputIndexes2[index]
                          ? "border-slate-200"
                          : "border-slate-500"
                      } border-b-2 items-center text-[1rem] md:text-[1.12rem]`}
                    >
                      <h2
                        className={`${
                          focusedInputIndexes2[index]
                            ? "focus-up-text"
                            : "focus-inp-text"
                        }`}
                      >
                        {label}
                      </h2>
                      <input
                        type={getInputType(label)}
                        className={`w-full py-4 `}
                        ref={inputRefs2[index]}
                        onFocus={() => handleInputFocus(index)}
                        onChange={(e) => {
                          const current = [...errorInputIndex2];
                          if (e.target.value.trim() === "") {
                            current[index] = true;
                            setErrorInputIndex2(current);
                          } else {
                            current[index] = false;
                            setErrorInputIndex2(current);
                          }
                        }}
                      />
                    </div>
                    {errorInputIndex2[index] && (
                      <p className="text-red-300">This field cannot be empty</p>
                    )}
                  </div>
                ))}
              <div className="grid gap-5 py-5 items-center">
                <Button onClick={handleNextClick}>Next</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
