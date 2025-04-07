import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ErrorDisplayProps {
  error: string;
  onClose?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClose }) => {
  return (
    <Card className="w-full bg-danger-50 border-danger-200">
      <CardBody className="p-4">
        <div className="flex items-start gap-2">
          <Icon icon="lucide:alert-circle" className="text-danger text-xl mt-0.5" />
          <p className="text-danger flex-grow">{error}</p>
          {onClose && (
            <button
              onClick={onClose}
              className="text-danger hover:text-danger-600 -mt-2 -mr-2"
              aria-label="Close error"
            >
              <Icon icon="lucide:x" className="text-xl" />
            </button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}; 