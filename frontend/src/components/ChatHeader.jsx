import React from "react";
import { UseChat } from "../store/useChatStore";
import Store from "../store/store";
import { X } from "lucide-react";
function ChatHeader() {
  const { selectedUser, setSelectedUser } = UseChat();
  const { onlineUsers } = Store();
  return (
    <div className=" p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">

        <div className="avatar">
          <div className="size-10 rounded-full relative">
            <img
              src={selectedUser.profilePic || "./avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>

        </div> 

        <div>
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
