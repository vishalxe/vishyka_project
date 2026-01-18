import { ReactNode } from 'react';

interface SplitScreenLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export default function SplitScreenLayout({ leftPanel, rightPanel }: SplitScreenLayoutProps) {
  return (
    <div className="flex h-full">
      <div className="w-[60%] p-6 overflow-y-auto">{leftPanel}</div>
      <div className="w-[40%] border-l border-white/10 p-6 overflow-y-auto flex flex-col gap-4">
        {rightPanel}
      </div>
    </div>
  );
}



