import { TabType } from '../types';
import { Home, BookOpen, Route, Activity } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export default function Navigation({ activeTab, onChangeTab }: NavigationProps) {
  const tabs = [
    { id: 'beranda' as TabType, label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'materi' as TabType, label: 'Materi', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'eksplorasi' as TabType, label: 'Eksplorasi', icon: <Route className="w-5 h-5" /> },
    { id: 'latihan' as TabType, label: 'Latihan', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <nav className="absolute bottom-0 left-0 w-full bg-[#6B3A2A] border-t-4 border-[#C9A84C] h-16 flex items-center justify-around z-40 px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            id={`nav-tab-${tab.id}`}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer ${
              isSelected ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-85'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-all duration-200 ${
              isSelected ? 'bg-[#C9A84C] text-white shadow-[0_0_10px_#C9A84C]' : 'bg-transparent text-white'
            }`}>
              {tab.icon}
            </div>
            <span className="text-[10px] text-white font-bold tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
