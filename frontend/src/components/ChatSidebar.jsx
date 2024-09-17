import { FaUser, FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { acceptRequest } from "../../../backend/controllers/userControllers";

const ChatSidebar = () => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [usersRender, setUsersRender] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchRequestValue, setSearchRequestValue] = useState("");

  const personId = 100;

  const linkStatus = ({ isActive }) => {
    return isActive ? "bg-gray-800" : "hover:bg-gray-700";
  };

  const searchFriends = () => {
    const listOfFriends = friends.filter((friend) =>
      friend.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    setFilteredFriends(listOfFriends);
  };
  const searchRequests = () => {
    const listOfRequests = requests.filter((request) =>
      request.name
        .toLocaleLowerCase()
        .includes(searchRequestValue.toLocaleLowerCase())
    );
    setFilteredRequests(listOfRequests);
  };

  const fetchFriendRequests = async () => {
    const res = await fetch("/api/users/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personId }),
    });
    const friendRequests = await res.json();
    setRequests(friendRequests);
    setFilteredRequests(friendRequests);
  };
  const fetchFriends = async () => {
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
  };

  const acceptRequest = async (requestingId) => {
    const res = await fetch("/api/users/friends", {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestingId, personId }),
    });
    const newFriendsList = await res.json();
    setFriends(newFriendsList);
    setFilteredFriends(newFriendsList);
  };
  useEffect(() => {
    searchFriends();
  }, [searchValue]);

  useEffect(() => {
    searchRequests();
  }, [searchRequestValue]);
  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
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
          {usersRender == 0 && (
            <div className="bg-slate-800 rounded-lg p-3 text-[0.92rem]">
              <div className="flex items-center gap-1">
                <FaMagnifyingGlass />
                <input
                  type="text"
                  className="w-full"
                  placeholder="Search friends by name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          )}
          {usersRender == 1 && (
            <div className="bg-slate-800 rounded-lg p-3 text-[0.92rem]">
              <div className="flex items-center gap-1">
                <FaMagnifyingGlass />
                <input
                  type="text"
                  className="w-full"
                  placeholder="Search your requests"
                  value={searchRequestValue}
                  onChange={(e) => setSearchRequestValue(e.target.value)}
                />
              </div>
            </div>
          )}
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

      <div className="grid gap py-2">
        {usersRender === 0 && friends.length == 0 ? (
          <div className="text-center py-5 font-bold">
            <div>You have no friends.</div>
            <Link></Link>
          </div>
        ) : (
          usersRender === 0 &&
          filteredFriends.length == 0 && (
            <div className="text-center py-5 font-bold">
              Couldn't find friend
            </div>
          )
        )}
        {usersRender === 1 && requests.length == 0 ? (
          <div className="text-center py-5 font-bold">
            <h1>No friends request available.</h1>
            <Link></Link>
          </div>
        ) : (
          usersRender === 1 &&
          filteredRequests.length == 0 && (
            <div className="text-center py-5 font-bold">
              No friend requests.
            </div>
          )
        )}

        {usersRender === 0 &&
          filteredFriends.length !== 0 &&
          filteredFriends.map((friend) => (
            <NavLink to={`./chats/${friend.id}`} className={linkStatus}>
              <div
                key={friend.id}
                className="cursor-pointer p-3"
              >
                <div className="flex gap-5 items-center">
                  <div>
                    <AiOutlineUser size={30} />
                  </div>
                  <div className="grid w-full">
                    <h2 className="text-md font-bold">{friend.name}</h2>
                    <p className="text-sm">{friend.email}</p>
                  </div>
                  <div className="text-sm flex bg-slate-400 text-slate-900 px-2 justify-center rounded-full">
                    5
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        {usersRender === 1 &&
          filteredRequests.length !== 0 &&
          filteredRequests.map((request) => (
            <NavLink className={linkStatus} to={`/chats/${request.id}`}>

            <div
              key={request.id}
              className="cursor-pointer  p-3"
            >
              <div className="flex gap-5 items-center">
                <div>
                  <AiOutlineUser size={30} />
                </div>
                <div className="grid w-full">
                  <h2 className="text-md font-bold">{request.name}</h2>
                  <p className="text-sm">{request.email}</p>
                </div>
                <div
                  onClick={acceptRequest}
                  className="text-sm flex bg-slate-400 hover:bg-slate-200 text-slate-900 px-2 py-1 justify-center rounded-full cursor-pointer"
                >
                  Accept
                </div>
              </div>
              </div>
            </NavLink>
              
          ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
