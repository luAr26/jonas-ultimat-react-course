import "./Bill.css";

function Bill({ bill, onChangeBill }) {
  return (
    <>
      <div className="bill-container">
        <label htmlFor="bill">How much was the bill?</label>
        <input
          type="number"
          name="bill"
          id="bill"
          value={bill}
          onChange={(e) => onChangeBill(+e.target.value)}
        />
      </div>
    </>
  );
}

export default Bill;
