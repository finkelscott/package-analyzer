import React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { ErrorDisplay } from './ErrorDisplay';

interface FileUploadProps {
  onFileLoad: (packageJson: any) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const handleFile = (file: File) => {
    if (file.type !== 'application/json' && !file.name.endsWith('package.json')) {
      setError('Please upload a valid package.json file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        
        // Check if the file has dependencies
        if (!content.dependencies) {
          setError('The package.json file does not contain any dependencies');
          return;
        }
        
        onFileLoad(content);
        setError(null);
      } catch (err) {
        setError('Failed to parse package.json: Invalid JSON format');
      }
    };
    reader.onerror = () => {
      setError('Failed to read the file');
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-4">
      <Card 
        className={`w-full transition-colors ${isDragging ? 'bg-primary-50' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardBody className="flex flex-col items-center gap-4 p-8">
          <Icon 
            icon={isDragging ? "lucide:file-down" : "lucide:upload"} 
            className={`w-12 h-12 transition-colors ${isDragging ? 'text-primary' : 'text-default-500'}`}
          />
          <h2 className="text-xl font-semibold">Upload package.json</h2>
          <p className="text-default-500">Drop your package.json file here or click to browse</p>
          <div className="relative">
            <Button
              color="primary"
              className="relative z-10"
              startContent={<Icon icon="lucide:file-plus" />}
            >
              Choose File
              <input
                type="file"
                accept="application/json"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onClick={(e) => {
                  // Reset the input value to allow selecting the same file again
                  (e.target as HTMLInputElement).value = '';
                }}
              />
            </Button>
          </div>
        </CardBody>
      </Card>
      {error && <ErrorDisplay error={error} onClose={() => setError(null)} />}
    </div>
  );
};
