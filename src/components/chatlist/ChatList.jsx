import React from "react";
import "./chatlist.css";

const ChatList = ({ listText }) => {
  return (
    <div className="chat-item">
      <p className="individual-text"><strong>{listText.name} :</strong>{listText.msg}</p>
    </div>
  );
};

export default ChatList;
