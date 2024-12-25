import React from 'react';
import { Button } from '@fluentui/react-components';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link to="/tasks">
        <Button appearance="primary">
          Go to Task List
        </Button>
      </Link>
    </div>
  );
};