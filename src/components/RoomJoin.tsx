
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Users, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

interface RoomJoinProps {
  onJoinRoom: (roomData: { roomId: string; passKey: string; userName: string }) => void;
}

export const RoomJoin: React.FC<RoomJoinProps> = ({ onJoinRoom }) => {
  const [roomId, setRoomId] = useState('');
  const [passKey, setPassKey] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomId.trim() || !passKey.trim() || !userName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate room validation (in real app, this would be an API call)
    setTimeout(() => {
      toast.success(`Welcome to room ${roomId}, ${userName}!`);
      onJoinRoom({ roomId: roomId.trim(), passKey: passKey.trim(), userName: userName.trim() });
      setIsLoading(false);
    }, 1000);
  };

  const handleCreateRoom = () => {
    const newRoomId = `room-${Math.random().toString(36).substr(2, 8)}`;
    const newPassKey = Math.random().toString(36).substr(2, 12);
    
    setRoomId(newRoomId);
    setPassKey(newPassKey);
    toast.success('New room created! Share these credentials with participants.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Interview Platform</CardTitle>
          <CardDescription>
            Join a collaborative interview room or create a new one
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Your Name
              </Label>
              <Input
                id="userName"
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roomId" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Room ID
              </Label>
              <Input
                id="roomId"
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passKey" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Pass Key
              </Label>
              <Input
                id="passKey"
                type="password"
                placeholder="Enter pass key"
                value={passKey}
                onChange={(e) => setPassKey(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Joining Room...' : 'Join Room'}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={handleCreateRoom}
          >
            Create New Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
