import { useState } from 'react';
import { TabSwitcher } from './ui/tab-switcher';

interface TabExampleProps {
  variant?: 'default' | 'pill';
  size?: 'default' | 'sm' | 'lg';
}

export function TabExample({
  variant = 'default',
  size = 'default',
}: TabExampleProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Transfer', 'History'];

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant={variant}
        size={size}
        className="gap-2.5"
      />

      <div className="p-4 bg-input-bg rounded-lg border border-input-border">
        {activeTab === 0 && <div>All content goes here</div>}
        {activeTab === 1 && <div>Transactions content goes here</div>}
      </div>
    </div>
  );
}
