import { useState } from "react";
import Button from "./Button";

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const { name } = selectedFriend;
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "friend" ? paidByUser * -1 : paidByFriend);
  }

  console.log(bill, paidByUser, whoIsPaying);
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>
      <label htmlFor="bill-value">💰 Bill value</label>
      <input
        type="text"
        id="bill-value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label htmlFor="expense">🧍‍♀️ Your expense</label>
      <input
        type="text"
        id="expense"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label htmlFor="friend-expense">👭 {name}'s expense</label>
      <input type="text" id="friend-expense" disabled value={paidByFriend} />
      <label htmlFor="bill-payer">🤑 Who is paying for the bill?</label>
      <select
        name="bill-payer"
        id="bill-payer"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};
export default FormSplitBill;
