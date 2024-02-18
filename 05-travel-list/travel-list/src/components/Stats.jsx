function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numOfPacked = items.filter((item) => item.packed).length;
  const itemsPacked = ((numOfPacked / numItems) * 100).toFixed(2);

  return (
    <footer className="stats">
      🧳{" "}
      <em>
        {Number(itemsPacked) === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${numItems} items on your list and you already packed
        ${numOfPacked} ${
              numOfPacked === 1 ? "item" : "items"
            } (${itemsPacked}%)`}
      </em>
    </footer>
  );
}

export default Stats;
