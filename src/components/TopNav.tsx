import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface TopNavProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  apiKey,
  onApiKeyChange,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <header className="w-full h-14 border-b border-[#2D2D2D] bg-[#121212] px-4 sm:px-6 flex items-center justify-between gap-4 select-none shrink-0">
      {/* Brand & Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-tight text-sm font-sans">
            ThesisCraft
          </span>
          <span className="text-[10px] font-mono text-[#707070] border border-[#2D2D2D] px-1.5 py-0.5 rounded">
            v2.4
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#2D2D2D] hidden sm:block" />

        {/* Status Dot */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8C8C8C]">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>System: Connected</span>
        </div>
      </div>

      {/* Center/Right Controls: API Key Input & Theme Toggle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label 
            htmlFor="api-key-input" 
            className="text-xs font-mono text-[#8C8C8C] hidden md:inline-block whitespace-nowrap"
          >
            API Key (Optional):
          </label>
          <input
            id="api-key-input"
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Auto-connected or enter key..."
            className="h-8 w-44 sm:w-60 px-2.5 rounded bg-[#1E1E1E] border border-[#2D2D2D] text-xs font-mono text-white placeholder-[#5A5A5A] focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="h-8 w-8 rounded border border-[#2D2D2D] bg-[#1E1E1E] text-[#B3B3B3] hover:text-white flex items-center justify-center transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
