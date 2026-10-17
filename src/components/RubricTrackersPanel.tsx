import React from 'react';
import { RubricTrackerItem } from '../types';
import { Check, CircleDashed } from 'lucide-react';

interface RubricTrackersPanelProps {
  trackers: RubricTrackerItem[];
  hasGenerated: boolean;
  documentMode: string;
}

export const RubricTrackersPanel: React.FC<RubricTrackersPanelProps> = ({
  trackers,
  hasGenerated,
  documentMode,
}) => {
  return (
    <div className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-[#2D2D2D] bg-[#141414] p-5 space-y-4 shrink-0 flex flex-col overflow-y-auto">
      
      {/* Panel Header */}
      <div className="pb-3 border-b border-[#2D2D2D] flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
            Rubric Trackers
          </span>
          <span className="text-[10px] text-[#707070] font-mono">
            {hasGenerated ? 'HEC OBE & IEEE AUDIT PASSED' : 'STANDARDS CHECKLIST'}
          </span>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
          hasGenerated 
            ? 'border-white text-white bg-[#222222]' 
            : 'border-[#2D2D2D] text-[#707070]'
        }`}>
          {hasGenerated ? '7/7 ACTIVE' : 'AWAITING'}
        </span>
      </div>

      <p className="text-xs text-[#8C8C8C] leading-relaxed">
        Academic compliance points dynamically verified during blueprint formulation against university standards.
      </p>

      {/* Checklist items */}
      <div className="space-y-2.5">
        {trackers.map((item) => {
          const isVerified = hasGenerated && item.verified;
          return (
            <div
              key={item.id}
              className={`p-3 rounded border transition-colors ${
                isVerified
                  ? 'border-[#404040] bg-[#1E1E1E] text-white'
                  : 'border-[#262626] bg-[#161616] text-[#707070]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    isVerified
                      ? 'border-white bg-white text-black'
                      : 'border-[#3D3D3D] text-transparent'
                  }`}>
                    {isVerified ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <CircleDashed className="w-2.5 h-2.5 text-[#4D4D4D]" />
                    )}
                  </div>
                  <span className={`text-xs font-semibold ${isVerified ? 'text-white' : 'text-[#8C8C8C]'}`}>
                    {item.title}
                  </span>
                </div>
                {isVerified && item.score && (
                  <span className="text-[10px] font-mono text-white border border-[#3A3A3A] px-1 rounded">
                    {item.score}%
                  </span>
                )}
              </div>
              <p className={`text-[11px] mt-1.5 pl-6 leading-normal ${
                isVerified ? 'text-[#A0A0A0]' : 'text-[#5A5A5A]'
              }`}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-auto pt-4 border-t border-[#2D2D2D] text-[11px] font-mono text-[#707070] space-y-1">
        <div className="flex justify-between">
          <span>Target Standard:</span>
          <span className="text-white">IEEE-830 / 1016</span>
        </div>
        <div className="flex justify-between">
          <span>Mode Target:</span>
          <span className="text-white uppercase">{documentMode}</span>
        </div>
      </div>

    </div>
  );
};
