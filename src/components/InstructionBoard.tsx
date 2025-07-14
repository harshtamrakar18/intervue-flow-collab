
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface InstructionBoardProps {
  roomId: string;
}

export const InstructionBoard: React.FC<InstructionBoardProps> = ({ roomId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState(
    `# Interview Instructions

## Overview
Welcome to this technical interview session. Please follow these guidelines:

## Round 1: Technical Discussion (15 mins)
- Discuss your experience with React and TypeScript
- Share examples of challenging problems you've solved
- Explain your approach to code organization and architecture

## Round 2: Coding Challenge (30 mins)
- Use the Code Editor tab to implement the solution
- Think out loud as you work through the problem
- Feel free to ask clarifying questions

## Round 3: System Design (15 mins)
- Use the Drawing tab to sketch your solution
- Explain scalability considerations
- Discuss trade-offs in your design

## Notes
- All sections are collaborative and real-time
- Take your time and ask questions if anything is unclear
- Use the chat for any additional communication

Good luck! 🚀`
  );
  const [editableInstructions, setEditableInstructions] = useState(instructions);

  const handleEdit = () => {
    setEditableInstructions(instructions);
    setIsEditing(true);
  };

  const handleSave = () => {
    setInstructions(editableInstructions);
    setIsEditing(false);
    toast.success('Instructions updated successfully!');
  };

  const handleCancel = () => {
    setEditableInstructions(instructions);
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Interview Guidelines</h3>
        {!isEditing ? (
          <Button onClick={handleEdit} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <Textarea
          value={editableInstructions}
          onChange={(e) => setEditableInstructions(e.target.value)}
          className="flex-1 resize-none font-mono text-sm"
          placeholder="Enter interview instructions here..."
        />
      ) : (
        <Card className="flex-1 overflow-hidden">
          <CardContent className="h-full p-6 overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              {instructions.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-2xl font-bold mb-4 text-gray-900">
                      {line.substring(2)}
                    </h1>
                  );
                } else if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-semibold mb-3 mt-6 text-gray-800">
                      {line.substring(3)}
                    </h2>
                  );
                } else if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="mb-1 text-gray-700">
                      {line.substring(2)}
                    </li>
                  );
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return (
                    <p key={index} className="mb-2 text-gray-700">
                      {line}
                    </p>
                  );
                }
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
