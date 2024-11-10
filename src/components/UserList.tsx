interface User {
  id: string;
  status: string;
  currentTime: number;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="bg-white rounded-lg p-4 shadow-lg max-w-lg mx-auto mb-6">
    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Active Users</h3>
    <ul className="space-y-3">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div>
            <p className="font-medium text-gray-900">{user.id}</p>
            <p className="text-sm text-gray-600">Status: {user.status}</p>
            <p className="text-xs text-gray-500">Current Time: {user.currentTime.toFixed(2)}s</p>
          </div>
          <span
            className={`w-3 h-3 rounded-full ${
              user.status === 'Viewing' ? 'bg-green-500' : user.status === 'Idle' ? 'bg-yellow-500' : 'bg-gray-400'
            }`}
            title={user.status}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
