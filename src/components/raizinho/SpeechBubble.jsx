import React from "react";

export default function SpeechBubble({ text }) {
  return (
    <div className="rz-pop-bubble pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1 z-20 w-max max-w-[230px] text-center bg-card border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold rounded-2xl px-3.5 py-2.5 shadow-xl shadow-emerald-900/15">
      {text}
      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-card border-b border-r border-emerald-200 rotate-45" />
    </div>
  );
}