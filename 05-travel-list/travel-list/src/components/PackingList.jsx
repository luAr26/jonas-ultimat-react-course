import Item from "./Item";

function PackingList() {
  const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: true },
  ];
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default PackingList;
