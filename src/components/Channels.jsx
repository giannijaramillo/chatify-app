import React from 'react';

const Channels = ({ channels, selectedChannel, onSelectChannel }) => {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col h-screen pt-20">
      <div className="px-4 py-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Channels</h3>
        <div className="space-y-1">
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selectedChannel === channel.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {channel.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channels;
