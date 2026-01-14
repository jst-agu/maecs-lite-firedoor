"use client";

import { useAssessmentStore } from '@/store/useAssessmentStore';
import Sidebar from '@/components/layout/Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useAssessmentStore();

  return (
    <>
      <Sidebar />
      <main 
        className={`min-h-screen transition-all duration-300 
          ${isSidebarCollapsed ? 'pl-16' : 'pl-64'}`}
      >
        {children}
      </main>
    </>
  );
}