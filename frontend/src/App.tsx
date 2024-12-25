import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { 
  FluentProvider, 
  webLightTheme,
} from '@fluentui/react-components';

// Import pages
import { TaskManagementPage } from './pages/TaskManagementPage';
import { FormConfigurationPage } from './pages/FormConfigurationPage'
import { NotFoundPage } from './pages/NotFoundPage';

// Import navigation components
import { AppNavigation } from './components/AppNavigation';
import './dist/output.css';


const App: React.FC = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <div className="flex h-screen font-sans">
          {/* Sidebar Navigation */}
          <AppNavigation />
          
          {/* Main Content Area */}
          <main className="flex-grow overflow-auto p-4">
            <Routes>
              {/* Default route redirects to task management */}
              <Route 
                path="/" 
                element={<Navigate to="/tasks" replace />} 
              />
              
              {/* Tasks Management Route */}
              <Route 
                path="/tasks" 
                element={<TaskManagementPage />} 
              />
              
              {/* Form Configuration Route */}
              <Route 
                path="/form-config" 
                element={<FormConfigurationPage />} 
              />
              
              {/* 404 Not Found Route */}
              <Route 
                path="*" 
                element={<NotFoundPage />} 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </FluentProvider>
  );
};

export default App;