import React from "react";
import "./userlist.css";

export default function UserList({ userlist }) {
  return (
    <div className="user">
      <ul className="ulist">
        {userlist.map((user, index) => (
          <li className="name-list" key={index}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
