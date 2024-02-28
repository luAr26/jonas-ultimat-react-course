import { useState } from "react";
import Button from "./Button";

const FromAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  console.log(name, image);

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();

    if (!name || !image) return;

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);
    // Reset form
    setName("");
    setImage("https://i.pravatar.cc/48");
    // Close form
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="friend-name">👭 Friend name</label>
      <input
        type="text"
        id="friend-name"
        value={name}
        name="friend-name"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="image-url">🌇 Image URL</label>
      <input
        type="text"
        id="image-url"
        name="image-url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};
export default FromAddFriend;
