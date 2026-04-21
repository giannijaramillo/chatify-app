
import { useState, useEffect } from "react";
import { socket } from '../socket';
import Channels from "./components/Channels";
import Users from "./components/Users";
import Chat from "./components/Chat";

function App() {
  // Datos hardcodeados
  const hardcodedChannels = [
    { id: "general", name: "#general" },
    { id: "random", name: "#random" },
    { id: "dev", name: "#dev" },
    { id: "offtopic", name: "#offtopic" },
  ];

  const hardcodedUsers = [
    { id: "alice", name: "Alice" },
    { id: "bob", name: "Bob" },
    { id: "charlie", name: "Charlie" },
    { id: "diana", name: "Diana" },
  ];

  // Estado central
  const [channels] = useState(hardcodedChannels);
  const [users] = useState(hardcodedUsers);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [usersOpen, setUsersOpen] = useState(false);
  const [chats, setChats] = useState({
    general: [],
    random: [],
    dev: [],
    offtopic: [],
    alice: [],
    bob: [],
    charlie: [],
    diana: [],
  });

  useEffect(() => {
    const OnConnect = () => {
      console.log("Connected to the server");
    };
    const OnDisconnect = () => {
      console.log("Disconnected from the server");
    }

    const OnChatMessage = (msg, serverOffset) => {
      socket.auth.serverOffset = serverOffset;
      setChats(prev => ({
        ...prev,
        general: [...prev.general, { text: msg, sender: 'Server' }]
      }));
    };

    socket.on("connect", OnConnect);
    socket.on("disconnect", OnDisconnect);
    socket.on('chat message', OnChatMessage);

    return () => {
      socket.off("connect", OnConnect);
      socket.off("disconnect", OnDisconnect);
      socket.off('chat message', OnChatMessage);
    };
  }, []);

  // Manejar envío de mensajes
  const handleSendMessage = (message) => {
    if (message.trim()) {
      socket.emit('chat message', message);
    }
  };

  // Obtener objeto del canal/usuario seleccionado
  const getSelectedObject = () => {
    const channel = channels.find(c => c.id === selectedChannel);
    if (channel) return channel;
    return users.find(u => u.id === selectedChannel);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Botón Users + Side Panel */}
      <div className="relative">
        <button
          onClick={() => setUsersOpen(!usersOpen)}
          className="absolute top-4 left-4 z-40 w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center text-white font-bold transition"
        >
          👥
        </button>
        {usersOpen && <Users users={users} onSelectUser={(userId) => { setSelectedChannel(userId); setUsersOpen(false); }} />}
      </div>

      {/* Channels Sidebar */}
      <Channels 
        channels={channels} 
        selectedChannel={selectedChannel}
        onSelectChannel={setSelectedChannel}
      />

      {/* Chat Main Area */}
      <Chat 
        selectedChannel={selectedChannel}
        selectedChannelObj={getSelectedObject()}
        chats={chats}
        onSendMessage={handleSendMessage}
      />

      {/* Overlay para cerrar Users panel */}
      {usersOpen && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => setUsersOpen(false)}
        />
      )}
    </div>
  )
};

export default App
