/** @format */

import { useState } from "react";
import Button from "./components/Button";
import FormSplitBill from "./components/FormSplitBill";
import FriendsList from "./components/FriendsList";
import FromAddFriend from "./components/FromAddFriend";
import initialFriends from "./initialFriends";

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setSelectedFriend(null);
    setShowAddFriend((prevShowAddFriend) => !prevShowAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((prevFriends) => [...prevFriends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((prev) => (prev?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((prevFriends) => {
      return prevFriends.map((friend) => {
        if (friend.id === selectedFriend.id) {
          return { ...friend, balance: friend.balance + value };
        }
        return friend;
      });
    });
    setSelectedFriend(null);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FromAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

export default App;
