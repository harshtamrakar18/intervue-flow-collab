
import React, { useState } from 'react';
import { RoomJoin } from '../components/RoomJoin';
import { InterviewRoom } from '../components/InterviewRoom';

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState<{
    roomId: string;
    passKey: string;
    userName: string;
  } | null>(null);

  const handleJoinRoom = (roomData: { roomId: string; passKey: string; userName: string }) => {
    setCurrentRoom(roomData);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {!currentRoom ? (
        <RoomJoin onJoinRoom={handleJoinRoom} />
      ) : (
        <InterviewRoom 
          roomData={currentRoom} 
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </div>
  );
};

export default Index;
