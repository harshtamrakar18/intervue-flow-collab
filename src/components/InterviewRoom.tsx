
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, MessageSquare, FileText, Code, Palette } from 'lucide-react';
import { ChatArea } from './ChatArea';
import { InstructionBoard } from './InstructionBoard';
import { CodeEditor } from './CodeEditor';
import { DrawingCanvas } from './DrawingCanvas';

interface InterviewRoomProps {
  roomData: {
    roomId: string;
    passKey: string;
    userName: string;
    instructions?: string;
  };
  onLeaveRoom: () => void;
}

type ActiveSection = 'chat' | 'instructions' | 'code' | 'drawing';

export const InterviewRoom: React.FC<InterviewRoomProps> = ({ roomData, onLeaveRoom }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('chat');

  const sections = [
    {
      id: 'chat' as ActiveSection,
      name: 'Chat',
      icon: MessageSquare,
      component: <ChatArea roomId={roomData.roomId} userName={roomData.userName} />
    },
    {
      id: 'instructions' as ActiveSection,
      name: 'Instructions',
      icon: FileText,
      component: <InstructionBoard roomId={roomData.roomId} initialInstructions={roomData.instructions} />
    },
    {
      id: 'code' as ActiveSection,
      name: 'Code Editor',
      icon: Code,
      component: <CodeEditor roomId={roomData.roomId} />
    },
    {
      id: 'drawing' as ActiveSection,
      name: 'Drawing',
      icon: Palette,
      component: <DrawingCanvas roomId={roomData.roomId} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Room: {roomData.roomId}</span>
            </div>
            <div className="text-sm text-gray-600">
              Welcome, {roomData.userName}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onLeaveRoom}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Leave Room
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Tools</h2>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {section.name}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            <Card className="h-full shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(sections.find(s => s.id === activeSection)?.icon || MessageSquare, { className: "w-5 h-5" })}
                  {sections.find(s => s.id === activeSection)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] overflow-hidden">
                {sections.find(s => s.id === activeSection)?.component}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
