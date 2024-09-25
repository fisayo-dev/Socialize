import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { ArrowRightCircleIcon, PlusIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import NoFriends from "../assets/no_friends.svg";
import RequestFriends from "../assets/request_friends.svg";
import { Button } from "../components";

const ChatSidebar = ({ setShow }) => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const userId = user.userId;
  const [loggedUser, setLoggedUser] = useState();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setLoggedUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [usersRender, setUsersRender] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchRequestValue, setSearchRequestValue] = useState("");

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestingId, personId }),
    });
    const newFriendsList = await res.json();
    const newFriendRequestsList = requests.filter(
      (requestUser) => requestUser.id !== requestingId
    );

    setFriends(newFriendsList);
    setFilteredFriends(newFriendsList);

    setRequests(newFriendRequestsList);
    setFilteredRequests(newFriendRequestsList);
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
    <div className="app-dark-bg-color relative side-bar-grid overflow-x-hidden h-[100vh] ">
      <div className="px-5 py-5 grid gap-2">
        <div className="grid w-full">
          <div className="flex py-3 items-center">
            <Link to="/chats" className="w-full ">
              <h2 className="font-bold text-[1.1rem]">Socialize</h2>
              <p className="text-sm">
                {!id && loggedUser && loggedUser.first_name}
              </p>
            </Link>
            <div className="flex items-center gap-2">
              <div
                onClick={setShow.bind(this, true)}
                className="cursor-pointer"
              >
                <PlusIcon className="w-6 h-6" />
              </div>
              <div
                onClick={() => {
                  logout();
                  navigate("/chats");
                }}
                className="cursor-pointer"
              >
                <ArrowRightCircleIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
          {usersRender == 0 && (
            <div className="bg-slate-800 rounded-lg p-3 text-[0.87rem]">
              <div className="flex items-center gap-2">
                <MagnifyingGlassIcon className="w-6 h-6"/>
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
            <div className="bg-slate-800 rounded-lg p-3 text-[0.87rem]">
              <div className="flex items-center gap-2">
              <MagnifyingGlassIcon className="w-6 h-6"/>
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

      <div className=" overflow-y-scroll py-3">
        {usersRender === 0 && friends.length == 0 ? (
          <div className="grid gap-5 text-center py-5 font-bold">
            <img src={NoFriends} className="w-4/5 mx-auto" alt="" draggable={false}/>
            <p>You have no friends.</p>
            <div onClick={setShow.bind(this, true)}>
              <Button>Create friends</Button>
            </div>
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
          <div className="grid gap-5 text-center py-5 font-bold">
            <img src={RequestFriends} className="w-3/5 mx-auto" alt="" draggable={false}/>
            <p>No friend request available</p>
            <div onClick={setShow.bind(this, true)}>
              <Button>Send request</Button>
            </div>
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
            <Link key={friend.id} to={`chats/${friend.id}`}>
              <div
                className={`cursor-pointer  px-5 py-3 ${
                  id == friend.id ? "bg-slate-800" : "hover:bg-slate-900"
                } `}
              >
                <div className="friend-card-grid gap-5 items-center">
                  <div>
                  <UserCircleIcon className="w-6 h-6"/>
                  </div>
                  <div className="grid w-full">
                    <h2 className="text-md font-bold">{friend.name}</h2>
                    <p className="text-[0.72rem]">{friend.email}</p>
                  </div>
                  <FaCircleDot className="text-lg" />
                </div>
              </div>
            </Link>
          ))}
        {usersRender === 1 &&
          filteredRequests.length !== 0 &&
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="cursor-pointer hover:bg-gray-800 p-3"
            >
              <div className="friend-card-grid gap-5 items-center">
                <div>
                <UserCircleIcon className="w-6 h-6"/>
                </div>
                <div className="grid w-full">
                  <h2 className="text-md font-bold">{request.name}</h2>
                  <p className="text-[0.72rem]">{`${request.email.substring(
                    0,
                    12
                  )} ...`}</p>
                </div>
                <div
                  onClick={acceptRequest.bind(this, request.id)}
                  className="text-sm flex bg-slate-400 hover:bg-slate-200 text-slate-900 px-2 py-1 justify-center rounded-full cursor-pointer"
                >
                  Accept
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
