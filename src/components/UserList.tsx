interface User {
  id: string;
  status: string;
  currentTime: number;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <div>
    <h3>Users</h3>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.id} - {user.status} at {user.currentTime.toFixed(2)}s
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
