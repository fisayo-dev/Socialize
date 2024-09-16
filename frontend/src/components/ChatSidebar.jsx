import { FaUser, FaPlus, FaMagnifyingGlass } from "react-icons/fa6";

import { AiOutlineUser } from "react-icons/ai";
import { useState, useEffect } from "react";

const ChatSidebar = () => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [usersRender, setUsersRender] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const personId = 100;

  const searchFriends = () => {
    const listOfFriends = friends.filter((friend) =>
      friend.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    setFilteredFriends(listOfFriends);
  };

  useEffect(() => {
    searchFriends();
  }, [searchValue]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personId }),
    });
    const friends = await res.json();
    setFriends(friends);
    setFilteredFriends(friends);
    console.log(friends);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-black bg-opacity-20 overflow-x-hidden h-[100vh] ">
      <div className="px-2 grid gap-2">
        <div className="grid ">
          <div className="flex py-3 items-center">
            <h2 className="w-full font-bold text-[1.2rem]">Socialize</h2>
            <div className="flex items-center gap-2">
              <FaPlus />
              <FaUser />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-[0.92rem]">
            <div className="flex items-center gap-1">
              <FaMagnifyingGlass />
              <input
                type="text"
                className="w-full"
                placeholder="Search for friends"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-5 items-center py-1">
          <h2
            className={`cursor-pointer ${
              usersRender == 0 && "border-b-2 border-slate-200 font-bold"
            } hover:font-bold`}
            onClick={() => setUsersRender(0)}
          >
            Friends
          </h2>
          <h2
            className={`cursor-pointer ${
              usersRender == 1 && "border-b-2 border-slate-200 font-bold"
            } hover:font-bold`}
            onClick={() => setUsersRender(1)}
          >
            Requests
          </h2>
        </div>
      </div>

      <div className="grid gap-1 py-2">
        {usersRender === 0 &&
          filteredFriends.map((friend) => (
            <div key={friend.id} className="bg-slate-800 p-3">
              <div className="flex gap-5 items-center">
                <div>
                  <AiOutlineUser size={30} />
                </div>
                <div className="grid w-full">
                  <h2 className="text-md font-bold">{friend.name}</h2>
                  <p className="text-sm">I will see you later.</p>
                </div>
                <div className="text-sm flex bg-slate-400 px-2 justify-center rounded-full">
                  1
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
