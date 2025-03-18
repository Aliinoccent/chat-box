import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { useState } from "react";
import { UseChat } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import Store from "../store/store";
function Sidebar() {
  const { users, selectedUser,setSelectedUser, isUserLoading, getUsers } = UseChat();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const {onlineUsers}=Store();
  // console.log("online user sidebar",onlineUsers)
  useEffect(() => {

    getUsers();

  }, []);
// console.log('this is users data',users)
  if (isUserLoading) return <MessageSkeleton />;
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
    // console.log('this is fileter users',filteredUsers)
  return (
    <aside className=" w-20 lg:w-72 border-r border-base-300 h-full flex flex-col transition-all duration-200 ">
      <div>
        <div className="flex  items-center gap-2">
          <Users className="size-6" />
          <span className="text-lg font-medium sm:hidden  lg:block">
            Contect
          </span>
        </div>
        {/* todo online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex  gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm ">show online fdonly</span>
          </label>
          <span className="text-xs text-zinc-500">online</span>
        </div>

        <div  className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? " bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
