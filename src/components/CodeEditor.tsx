
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Play, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  roomId: string;
}

const languages = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'html', name: 'HTML', extension: 'html' },
  { id: 'css', name: 'CSS', extension: 'css' }
];

const codeTemplates = {
  javascript: `// JavaScript Code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  typescript: `// TypeScript Code
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = { id: 1, name: "John", email: "john@example.com" };
console.log(greetUser(user));`,
  python: `# Python Code
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
  java: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println(fibonacci(10));
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,
  cpp: `// C++ Code
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Hello, World!" << endl;
    cout << fibonacci(10) << endl;
    return 0;
}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Challenge</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Start coding here...</p>
</body>
</html>`,
  css: `/* CSS Code */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 8px;
}`
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ roomId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(codeTemplates.javascript);
  const [output, setOutput] = useState('');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(codeTemplates[language as keyof typeof codeTemplates] || '// Start coding here...');
    setOutput('');
  };

  const handleRunCode = () => {
    // Simulate code execution (in real app, this would send to a backend service)
    setOutput('Running code...');
    setTimeout(() => {
      const outputs = [
        '55', // fibonacci result
        'Hello, World!\n55',
        'Code executed successfully!',
        'Output: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]'
      ];
      setOutput(outputs[Math.floor(Math.random() * outputs.length)]);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const handleDownloadCode = () => {
    const language = languages.find(lang => lang.id === selectedLanguage);
    const filename = `code.${language?.extension || 'txt'}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Code downloaded as ${filename}`);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={handleRunCode} className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadCode}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium">Code Editor</h3>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-full resize-none border-0 font-mono text-sm focus:ring-0 focus:border-0"
              placeholder="Start coding here..."
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium">Output</h3>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-full bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-auto">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-gray-500">Click "Run Code" to see output...</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
