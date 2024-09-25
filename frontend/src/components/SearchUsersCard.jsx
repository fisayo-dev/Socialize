import {
  XMarkIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useEffect, useState } from "react";

const SearchUsersCard = ({ setShow }) => {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json(res);
    console.log(data);
    setUsers(data);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="z-50 grid gap-4 p-5 text-slate-400 bg-slate-900 rounded-xl middle-card">
      <div
        className="grid justify-end cursor-pointer "
        onClick={setShow.bind(this, false)}
      >
        <XMarkIcon className="hover:text-slate-200  w-7 h-7" />
      </div>
      <div className="flex items-center border-slate-700 p-3 border-2 rounded-lg gap-2">
        <MagnifyingGlassIcon className="w-6 h-6" />
        <input
          type="text"
          className="w-full"
          placeholder="Search for user by email"
        />
      </div>
      <div className=" grid gap-3 h-[50vh] overflow-scroll">
        {users.length !== 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="shadow-md hover:bg-slate-800 cursor-pointer rounded-lg border-2 border-slate-700 p-3"
            >
              <div className="flex gap-3 items-center">
                <UserCircleIcon className="w-12 h-12" />
                <div className="grid w-full">
                  <h2 className="text-2xl">{user.last_name}</h2>
                  <p className="text-sm">{user.email}</p>
                </div>
                <Button className="">Add</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchUsersCard;
