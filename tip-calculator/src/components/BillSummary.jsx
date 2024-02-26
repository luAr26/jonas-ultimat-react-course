import "./BillSummary.css";

function BillSummary({ bill, totalTip }) {
  return (
    <>
      <p className="bill-summary">{`You pay $${(bill + totalTip).toFixed(
        2
      )} ($${bill.toFixed(2)} + $${totalTip.toFixed(2)} tip).`}</p>
    </>
  );
}

export default BillSummary;
