"use client";

import React from 'react';
import Link from 'next/link';
import { ClipboardCheck, ShieldCheck, History, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header with Mae Compliance Branding */}
      <header className="w-full bg-white border-b border-slate-200 py-6 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            MAE <span className="text-red-600">COMPLIANCE</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Inspector Portal</p>
        </div>
        <ShieldCheck className="text-red-600 w-8 h-8" />
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 max-w-lg mx-auto w-full">
        {/* Main Action Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 w-full">
          <div className="bg-red-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <ClipboardCheck className="text-red-600 w-7 h-7" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Fire Door Inspection</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Perform a standard 15-point assessment. Generate compliant PDF reports instantly for site records.
          </p>

          <Link href="/inspect" className="group flex items-center justify-between bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-red-100">
            <span>Start New Inspection</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Secondary Navigation */}
        <div className="mt-6 w-full grid grid-cols-1 gap-4">
          <button className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 hover:border-red-200 transition-colors group">
            <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-red-50 transition-colors">
              <History className="text-slate-400 w-5 h-5 group-hover:text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800">Draft History</p>
              <p className="text-xs text-slate-400">Access saved local audits</p>
            </div>
          </button>
          
          {/* Subtle placeholder for FRA */}
          <div className="p-5 rounded-2xl border border-dashed border-slate-300 opacity-60 flex justify-between items-center">
             <p className="text-sm font-semibold text-slate-400">FRA Module</p>
             <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold uppercase">Coming Soon</span>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-slate-400 text-[11px] font-medium tracking-wide mb-1">
          OFFICIAL COMPLIANCE TOOL FOR
        </p>
        <p className="text-slate-600 text-xs font-bold">
          MAE COMPLIANCE SERVICE LTD
        </p>
      </footer>
    </div>
  );
}