"use client";

import { useState } from 'react';
import Link from 'next/link'; // Added for navigation
import { ChevronLeft, Home } from 'lucide-react'; // Clean icons
import AppHeader from '@/components/layout/AppHeader';
import SiteDetails from '@/components/forms/SiteDetails';
import DoorCard from '@/components/forms/DoorCard';
import StaticBlueprint from '@/components/preview/StaticBluePrint';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { generatePDF } from '@/utils/generatePDF';

export default function InspectionPage() {
  const { siteDetails, doors, resetForm } = useAssessmentStore(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
      
      {/* NEW: Navigation Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Audit Mode</span>
        </div>
      </div>

      <AppHeader />

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest"
          >
            {isSidebarOpen ? '[ Hide Summary − ]' : '[ Show Summary + ]'}
          </button>
        
          <section className="mb-8">
            <SiteDetails />
          </section>

          <section className="space-y-8 pb-24">
            {doors.length > 0 ? (
              doors.map((door) => (
                <div key={door.id} id={door.id}>
                  <DoorCard door={door} />
                </div>
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-white text-gray-400">
                Please enter the Number of Doors above to start.
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN (SIDEBAR) */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} w-full xl:w-80 shrink-0`}>
          <div className="sticky top-8 space-y-4">
            <StaticBlueprint />

            <button 
              className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl flex items-center justify-center gap-2"
              onClick={() => generatePDF(siteDetails, doors)}
            >
              Generate Final PDF
            </button>

            <button 
              className="w-full bg-white text-gray-500 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 hover:text-red-600 border border-gray-200 transition-all flex items-center justify-center gap-2"
              onClick={resetForm}
            >
              Clear & New Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}