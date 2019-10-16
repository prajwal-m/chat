import React from "react";
import "./chatlist.css";

const renderMsg = (msgObj, index) => {
  console.log(msgObj);
  return (
    <div key={index}>
      <p>
        <strong>{msgObj.name} : </strong>
        {msgObj.msg}
      </p>
    </div>
  );
};

const ChatList = ({ listText }) => {
  return (
    <div className="chat-item">
      {listText.map((msgObj, index) => renderMsg(msgObj, index))}
    </div>
  );
};

export default ChatList;
