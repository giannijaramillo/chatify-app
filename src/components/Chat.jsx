import React, { useState, useRef, useEffect } from 'react';

const Chat = ({ selectedChannel, selectedChannelObj, chats, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats[selectedChannel]]);

  const handleSend = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-950 h-screen">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          {selectedChannelObj?.name}
        </h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {chats[selectedChannel]?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No hay mensajes aún. ¡Empieza la conversación!</p>
          </div>
        ) : (
          chats[selectedChannel]?.map((msg, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-purple-400">{msg.sender}</span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="text-gray-200 ml-2">{msg.text}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="bg-gray-900 border-t border-gray-700 px-6 py-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
