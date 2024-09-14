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
  FaCalendar,
} from "react-icons/fa6";

const Signup = () => {
  const currentYEAR = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("--Select Country--");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("--Select Gender--");

  // Field status state
  const [firstNameStatus, setFirstNameStatus] = useState(false);
  const [lastNameStatus, setLastNameStatus] = useState(false);
  const [middleNameStatus, setMiddleNameStatus] = useState(false);
  const [dateOfBirthStatus, setDateOfBirthStatus] = useState(false);
  const [genderStatus, setGenderStatus] = useState(false);
  const [countryStatus, setCountryStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(false);

  const [formPhase, setFormPhase] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  function setFormReadyToNext() {
    setFormPhase((prev) => prev + 1);
  }

  const checkInputFilledPhase0 = () => {
    let status = false;
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      middleName.trim() !== ""
    ) {
      status = true;
    }
    return status;
  };
  const checkInputFilledPhase1 = () => {
    let status = false;
    if (
      gender !== "--Select Gender--" &&
      new Date(dateOfBirth).getFullYear() < currentYEAR - 2 &&
      country !== "--Select Country--"
    ) {
      status = true;
    }
    return status;
  };
  const checkInputFilledPhase2 = () => {
    let status = false;
    if (new Date(dateOfBirth).getFullYear() < currentYEAR - 2) {
      status = true;
    }
    return status;
  };
  const checkInputFilledPhase3 = () => {
    let status = false;
    if (email.trim() !== "" && password.trim() !== "") {
      status = true;
    }
    return status;
  };
  const checkInputFilledPhase4 = () => {
    let status = false;
    if (password === confirmPassword) {
      status = true;
    }
    return status;
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    if (formPhase == 0 && checkInputFilledPhase0()) {
      setFormReadyToNext();
    } else {
      setNextButtonDisabled(true);
    }
    if (formPhase == 1 && checkInputFilledPhase1()) {
      setFormReadyToNext();
    } else {
      setNextButtonDisabled(true);
    }
    if (formPhase == 2 && checkInputFilledPhase2()) {
      setFormReadyToNext();
    } else {
      setNextButtonDisabled(true);
    }
    if (formPhase == 3 && checkInputFilledPhase3()) {
      setNextButtonDisabled(true);
    }
    if (formPhase == 4 && checkInputFilledPhase4()) {
      submitForm();
    }
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    setFormPhase((prev) => prev - 1);
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
          <div className="grid gap-10 ">
            <h2 className="text-center text-4xl font-bold">SignUp</h2>
            <form
              name="signup_form"
              id="signup_form"
              className="w-full grid gap-6 md:w-2/4 mx-auto"
            >
              <div className="grid ">
                <div className={`${formPhase == 0 ? "grid gap-5" : "hidden"}`}>
                  <div className="grid gap-2">
                    <div className="form-styles">
                      <FaUserLarge />
                      <input
                        className="w-full"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => {
                          {
                            e.target.value.trim() == ""
                              ? setFirstNameStatus(true)
                              : setFirstNameStatus(false);
                          }
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>
                    {firstNameStatus && (
                      <p className="text-sm text-red-400">
                        Filled cannot be empty
                      </p>
                    )}
                  </div>
                  <div className="grid-gap-2">
                    <div className="form-styles">
                      <FaUser />
                      <input
                        className="w-full"
                        type="text"
                        placeholder="Middle Name"
                        value={middleName}
                        onChange={(e) => {
                          {
                            e.target.value.trim() == ""
                              ? setMiddleNameStatus(true)
                              : setMiddleNameStatus(false);
                          }
                          setMiddleName(e.target.value);
                        }}
                      />
                    </div>
                    {middleNameStatus && (
                      <p className="text-sm text-red-400">
                        Filled cannot be empty
                      </p>
                    )}
                  </div>
                  <div className="grid-gap-2">
                    <div className="form-styles">
                      <FaUser />
                      <input
                        className="w-full"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => {
                          {
                            e.target.value.trim() == ""
                              ? setLastNameStatus(true)
                              : setLastNameStatus(false);
                          }
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                    {lastNameStatus && (
                      <p className="text-sm text-red-400">
                        Filled cannot be empty
                      </p>
                    )}
                  </div>
                </div>
                <div className={`${formPhase == 1 ? "grid gap-5" : "hidden"}`}>
                  <div className="grid gap-2">
                    <div className="form-styles">
                      <FaPerson />
                      <select
                        name=""
                        id=""
                        placeholder="--Select Gender--"
                        className="select w-full"
                        value={gender}
                        onChange={(e) => {
                          e.target.value == "--Select Gender--"
                            ? setGenderStatus(true)
                            : setGenderStatus(false);
                          setGender(e.target.value);
                        }}
                      >
                        <option value="--Select Gender--">
                          --Select Gender--
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    {genderStatus && (
                      <p className="text-sm text-red-400">Select a Gender</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="form-styles">
                      <FaGlobe />
                      <select
                        name=""
                        id=""
                        value={country}
                        onChange={(e) => {
                          e.target.value == "--Select Country--"
                            ? setCountryStatus(true)
                            : setCountryStatus(false);
                          setCountry(e.target.value);
                        }}
                        className="select w-full"
                      >
                        <option value="--Select Country">
                          --Select Country--
                        </option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Chad">Chad</option>
                      </select>
                    </div>
                    {countryStatus && (
                      <p className="text-sm text-red-400">
                        Select your country!
                      </p>
                    )}
                  </div>
                </div>
                <div className={`${formPhase == 2 ? "grid gap-5" : "hidden"}`}>
                  <div className="grid-gap-2">
                    <div className="form-styles">
                      <FaCalendar />
                      <input
                        className="w-full"
                        type="date"
                        placeholder="Last Name"
                        value={dateOfBirth}
                        onChange={(e) => {
                          new Date(dateOfBirth).getFullYear() < currentYEAR - 2
                            ? setDateOfBirthStatus(false)
                            : setDateOfBirthStatus(true);
                          setDateOfBirth(e.target.value);
                        }}
                      />
                    </div>
                    {dateOfBirthStatus && (
                      <p className="text-sm text-red-400">
                        You are too young!!
                      </p>
                    )}
                  </div>
                </div>

                <div className={`${formPhase == 3 ? "grid gap-5" : "hidden"}`}>
                  <div className="form-styles">
                    <FaEnvelope />
                    <input
                      className="w-full"
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-styles">
                    <FaKey />
                    <input
                      className="w-full"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className={`${formPhase == 4 ? "grid gap-5" : "hidden"}`}>
                  <div className="form-styles">
                    <FaKey />
                    <input
                      className="w-full"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                disabled={nextButtonDisabled}
                className="disabled:bg-gray-500 disabled:cursor-not-allowed grid grid-cols-2 gap-5 py-5 items-center ml-auto w-full"
              >
                {formPhase > 0 && (
                  <Button onClick={handlePrevClick}>Previous</Button>
                )}
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
