import "./Bill.css";

function Bill({ bill, onChangeBill }) {
  return (
    <>
      <div className="bill-container">
        <p>How much was the bill?</p>
        <div>
          <input
            type="number"
            name="bill"
            id="bill"
            value={bill}
            onChange={(e) => onChangeBill(+e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Bill;
