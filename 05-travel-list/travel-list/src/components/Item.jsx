function Item({
  id,
  description,
  quantity,
  packed,
  ondDeleteItem,
  onToggleItem,
}) {
  return (
    <li>
      <input type="checkbox" value={packed} onChange={() => onToggleItem(id)} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => ondDeleteItem(id)}>❌</button>
    </li>
  );
}

export default Item;
