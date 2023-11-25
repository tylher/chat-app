import React, { useState, useEffect } from "react";

const JoinRoom = ({ onJoin }) => {
  const [username, setUsername] = useState("");
  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onJoin(username);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  return (
    <>
      <h2>{username}</h2>
      <form onSubmit={handleJoin}>
        <input placeholder="Enter username" onChange={handleChange} />
        <input type="submit" value="Join room" />
      </form>

      {/* {connectionStatus == "pending" && <p>Connecting...</p>}
      {connectionStatus == "failed" && <p>Could not connect</p>} */}
    </>
  );
};

export default JoinRoom;
