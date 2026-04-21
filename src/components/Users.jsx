import React from 'react';

const Users = ({ users, onSelectUser }) => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-700 shadow-xl animate-in slide-in-from-left z-30 pt-20">
      <div className="px-4 py-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Direct Messages</h3>
        <div className="space-y-1">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition"
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
