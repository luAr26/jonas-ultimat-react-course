import { useState } from 'react';
import './App.css';
import Bill from './components/Bill';
import SelectPercentage from './components/SelectPercentage';
import BillSummary from './components/BillSummary';
import Button from './components/Button';

function App() {
  const [bill, setBill] = useState(0);
  const [yourTip, setYourTip] = useState("");
  const [friendTip, setFriendTip] = useState("");

  const yourTipInputId = 'your-tip';
  const friendTipInputId = 'friend-tip';

  const yourTipValue = yourTip === "" ? 0 : Number(yourTip);
  const friendTipValue = friendTip === "" ? 0 : Number(friendTip);
  const totalTip = Number((bill * yourTipValue / 100) + (bill * friendTipValue / 100));
  console.log(typeof totalTip);
    
  function handleChangeBill(value) {
    setBill(value);
  }

  function handleChangeYourTip(value) {
    setYourTip(value);
  }

  function handleChangeFriendTip(value) {
    setFriendTip(value);
  }

  function handleReset() {
    setBill(0);
    setYourTip("");
    setFriendTip("");
  }

  return (
    <div className="container open-sans-calculator">
      <h1>Calculate tip</h1>
      <Bill bill={bill} onChangeBill={handleChangeBill}/>
      <SelectPercentage id={yourTipInputId} tip={yourTip} onChangeYourTip={handleChangeYourTip}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage id={friendTipInputId} tip={friendTip} onChangeYourTip={handleChangeFriendTip}>
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && 
      <>
        <BillSummary bill={bill} totalTip={totalTip} />
        <Button onReset={handleReset}>Reset</Button>
      </>}
    </div>
  );
}

export default App;
