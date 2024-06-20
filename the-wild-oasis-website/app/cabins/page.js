/** @format */
export default async function Page() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersJson = await users.json();
  console.log(usersJson);
  return (
    <div>
      <h1>Cabins page</h1>
      <ul>
        {usersJson.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
