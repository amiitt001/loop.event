import React from "react";

export default function MobileBlocker() {
  return (
    <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black p-10 text-center font-mono">
      <div className="mb-8 border-4 border-red-500 bg-red-500/10 px-8 py-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
        <h1 className="text-3xl font-black tracking-widest text-red-500 uppercase">
          Access Denied
        </h1>
      </div>
      
      <div className="max-w-md space-y-6">
        <p className="text-lg leading-relaxed text-[#00ff88] opacity-90">
          <span className="text-red-400 font-bold">CRITICAL_ERROR:</span> Incompatible hardware detected. 
        </p>
        
        <p className="text-sm leading-relaxed text-slate-400">
          The <span className="text-[#00ff88]">PROMPTWAR</span> neural interface requires advanced GPU processing and a multi-modular desktop environment to maintain stable synchronization.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="h-1 w-full bg-slate-800">
            <div className="h-full w-1/3 bg-[#00ff88] animate-pulse" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
            Please switch to a desktop terminal to proceed.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.2em] text-slate-700">
        // Hardware Protocol: DESKTOP_ONLY_STRICT
      </div>
    </div>
  );
}
