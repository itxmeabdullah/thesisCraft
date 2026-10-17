import React, { useState } from 'react';
import { Lock, Check, CreditCard, Shield, RefreshCw } from 'lucide-react';

interface MinimalistPaywallProps {
  onVerify: () => void;
  isUnlocked: boolean;
}

export const MinimalistPaywall: React.FC<MinimalistPaywallProps> = ({
  onVerify,
  isUnlocked,
}) => {
  const [activeMethod, setActiveMethod] = useState<'local' | 'card'>('local');
  const [verifying, setVerifying] = useState(false);
  const [refId, setRefId] = useState('TRX-784920');

  if (isUnlocked) return null;

  const handleVerifyClick = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onVerify();
    }, 700);
  };

  return (
    <div className="border border-[#383838] bg-[#161616] p-6 rounded my-8 max-w-2xl mx-auto shadow-2xl text-left select-none">
      
      {/* Title & Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2D2D2D]">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-white" />
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Academic Export Premium License Required
          </h3>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-[#444444] bg-[#222222] text-white">
          1,500 PKR
        </span>
      </div>

      <p className="text-xs text-[#999999] my-3 leading-relaxed">
        Single Blueprint Generation: 1,500 PKR. Unlock unrestricted full-document markdown copy, raw LaTeX export, and full database schema queries for university committee evaluation.
      </p>

      {/* Method Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveMethod('local')}
          className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
            activeMethod === 'local'
              ? 'border-white bg-[#262626] text-white font-medium'
              : 'border-[#2D2D2D] bg-[#1A1A1A] text-[#707070] hover:text-white'
          }`}
        >
          Local Transfer (SadaPay / NayaPay / EasyPaisa)
        </button>
        <button
          type="button"
          onClick={() => setActiveMethod('card')}
          className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
            activeMethod === 'card'
              ? 'border-white bg-[#262626] text-white font-medium'
              : 'border-[#2D2D2D] bg-[#1A1A1A] text-[#707070] hover:text-white'
          }`}
        >
          International Card ($5.50)
        </button>
      </div>

      {/* Tab 1: Local Bank / Wallet Transfer */}
      {activeMethod === 'local' ? (
        <div className="p-4 rounded border border-[#2D2D2D] bg-[#1A1A1A] space-y-3 text-xs font-mono">
          <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
            <span className="text-[#8C8C8C]">Account Title:</span>
            <span className="text-white font-semibold">ThesisCraft Academic Systems</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
            <span className="text-[#8C8C8C]">SadaPay / NayaPay / EasyPaisa:</span>
            <span className="text-white font-bold">0304-9821455</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
            <span className="text-[#8C8C8C]">IBAN (Raast Instant Clearing):</span>
            <span className="text-[#B3B3B3]">PK74SADA000003049821</span>
          </div>

          <div className="pt-1">
            <label className="text-[11px] text-[#707070] block mb-1">
              Transaction Reference / Receipt ID:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-xs font-mono text-white focus:outline-none focus:border-white"
              />
              <button
                type="button"
                onClick={() => setRefId(`TRX-${Math.floor(100000 + Math.random() * 900000)}`)}
                className="px-2 py-1.5 rounded bg-[#242424] hover:bg-[#333333] border border-[#2D2D2D] text-[#8C8C8C] hover:text-white text-[11px]"
                title="Generate fresh ID"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: International Card Input Form */
        <div className="p-4 rounded border border-[#2D2D2D] bg-[#1A1A1A] space-y-3 text-xs">
          <div>
            <label className="text-[11px] text-[#8C8C8C] block mb-1">Card Number</label>
            <input
              type="text"
              defaultValue="4242 •••• •••• 4242"
              className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-xs font-mono text-white focus:outline-none focus:border-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#8C8C8C] block mb-1">MM/YY</label>
              <input
                type="text"
                defaultValue="08/28"
                className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-xs font-mono text-white focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8C8C8C] block mb-1">CVC</label>
              <input
                type="text"
                defaultValue="891"
                className="w-full px-2.5 py-1.5 rounded bg-[#121212] border border-[#2D2D2D] text-xs font-mono text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Verification Button */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-[11px] font-mono text-[#707070]">
          Instant Sandbox Verification
        </span>
        <button
          type="button"
          onClick={handleVerifyClick}
          disabled={verifying}
          className="px-5 py-2 rounded bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-colors cursor-pointer flex items-center gap-1.5"
        >
          {verifying ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Verifying Transfer...</span>
            </>
          ) : (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Verify Transfer & Unlock Blueprint</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
