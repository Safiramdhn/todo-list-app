import React from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from '@fluentui/react-components';
import { List } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) => `
        flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200
        ${isActive
          ? 'bg-blue-100 text-blue-700 font-medium'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
      aria-current={undefined /* Removed unnecessary function */}
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <Icon
            className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}
          />
          <span className="text-sm">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export const AppNavigation: React.FC = () => {
  return (
    <nav className="w-64 bg-gray-50 px-4 py-6 border-r border-gray-200 h-screen">
      <div className="mb-8 text-center">
        <Text
          as="h1"
          size={500}
          weight="semibold"
          className="text-xl font-semibold text-gray-800"
        >
          Task Management App
        </Text>
      </div>

      <div className="space-y-2">
        <NavItem to="/tasks" icon={List} label="Task List" />
      </div>
    </nav>
  );
};
