
import React from 'react';
import type { View } from '../App';
import { ChartBarIcon, CubeIcon, PresentationChartLineIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: <ChartBarIcon className="w-5 h-5" /> },
    { id: 'products', label: 'المنتجات', icon: <CubeIcon className="w-5 h-5" /> },
    { id: 'analytics', label: 'التحليلات', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Wise Sale</h1>
          </div>
          <nav className="hidden md:flex space-x-reverse space-x-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id as View)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
       {/* Mobile Nav */}
      <nav className="md:hidden flex justify-around p-2 border-t border-slate-200 bg-white">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex flex-col items-center gap-1 p-2 rounded-md text-xs font-medium transition-colors w-full ${
                currentView === item.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
      </nav>
    </header>
  );
};

export default Header;
