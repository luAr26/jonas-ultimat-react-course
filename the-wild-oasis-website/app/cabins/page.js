/** @format */
import Counter from "../components/Counter";
export default async function Page() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersJson = await users.json();
  console.log(usersJson);

  return (
    <div>
      <h1>Cabins page</h1>
      <h3>Counter</h3>
      {usersJson.map((user) => (
        <p key={user.id}>{user.website}</p>
      ))}
      <Counter users={usersJson} />
    </div>
  );
}
