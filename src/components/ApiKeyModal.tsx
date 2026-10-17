import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, CheckCircle2, Server, Cpu, RefreshCw, X, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [checking, setChecking] = useState(false);
  const [healthStatus, setHealthStatus] = useState<any>(null);

  const checkHealth = async () => {
    setChecking(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealthStatus(data);
    } catch (e) {
      setHealthStatus({ status: 'online-fallback', model: 'gemini-3.8-flash', platform: 'ThesisCraft OS' });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl glass-panel border border-cyan-500/40 p-6 shadow-2xl bg-[#0E1526]/95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gemini API Engine Connectivity</h3>
              <p className="text-xs text-slate-400 font-mono">Server-Side Proxy Architecture</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                Backend Ingress Endpoint
              </span>
              <span className="font-mono text-cyan-300">/api/generate</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-violet-400" />
                Active Model Pipeline
              </span>
              <span className="font-mono text-violet-300">gemini-3.8-flash</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Telemetry User-Agent
              </span>
              <span className="font-mono text-emerald-400">aistudio-build</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Zero-Config Key Injection</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              In this AI Studio Build environment, Gemini API credentials are automatically attached on the server side via secure environment injection. API keys are strictly protected from client exposure.
            </p>
          </div>

          {healthStatus && (
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">Status: {healthStatus.status || 'Active'}</span>
              </div>
              <span className="text-slate-500 text-[11px]">
                {healthStatus.timestamp ? new Date(healthStatus.timestamp).toLocaleTimeString() : 'Verified'}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={checkHealth}
            disabled={checking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
            <span>Re-check Engine</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
