import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, Users, Video, Plus } from 'lucide-react';
import { RoomJoin } from '@/components/RoomJoin';
import { InterviewRoom } from '@/components/InterviewRoom';

const Home = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [currentRoom, setCurrentRoom] = useState<{
    roomId: string;
    passKey: string;
    userName: string;
    instructions?: string;
  } | null>(null);
  const [showRoomJoin, setShowRoomJoin] = useState(false);

  const handleJoinRoom = (roomData: { roomId: string; passKey: string; userName: string; instructions?: string }) => {
    setCurrentRoom(roomData);
    setShowRoomJoin(false);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  // If user is in a room, show the interview room
  if (currentRoom) {
    return <InterviewRoom roomData={currentRoom} onLeaveRoom={handleLeaveRoom} />;
  }

  // If showing room join, show the room join component
  if (showRoomJoin) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header with back button */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Button variant="outline" onClick={() => setShowRoomJoin(false)}>
              ← Back to Dashboard
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm">Hello, {user?.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <RoomJoin onJoinRoom={handleJoinRoom} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Interview Platform Dashboard</h1>
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm">Hello, {user.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowRoomJoin(true)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Join Interview Room
                </CardTitle>
                <CardDescription>
                  Join an existing interview room with a room ID and pass key
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Join Room
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowRoomJoin(true)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Create New Room
                </CardTitle>
                <CardDescription>
                  Create a new interview room and invite participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Create Room
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>
                Your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user && (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>ID:</strong> {user.id}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Features
              </CardTitle>
              <CardDescription>
                Available interview tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>✅ Real-time Chat</p>
                <p>✅ Code Editor</p>
                <p>✅ Drawing Canvas</p>
                <p>✅ Instructions Board</p>
                <p>✅ Room Management</p>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Account and application settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Welcome to the Interview Platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Welcome to your interview platform! You can now:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Join existing interview rooms with a room ID and pass key</li>
                  <li>Create new rooms for conducting interviews</li>
                  <li>Use real-time chat, code editor, and drawing tools</li>
                  <li>Share instructions with interview participants</li>
                </ul>
                <div className="pt-4">
                  <Button onClick={() => setShowRoomJoin(true)} className="w-full md:w-auto">
                    Get Started - Join a Room
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;