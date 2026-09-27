import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* Top-Right Soft Gold/Beige Glow */}
      <div
        className="ambient-blob-1 absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(217, 204, 134, 0.07) 0%, rgba(182, 154, 98, 0.02) 65%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Bottom-Left Soft Red Glow */}
      <div
        className="ambient-blob-2 absolute -bottom-28 -left-28 w-[520px] h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(216, 50, 50, 0.045) 0%, rgba(198, 40, 40, 0.015) 60%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Middle Warm Brown Faint Glow */}
      <div
        className="ambient-blob-3 absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(118, 83, 49, 0.035) 0%, rgba(74, 53, 31, 0.01) 65%, transparent 80%)',
          filter: 'blur(110px)',
        }}
      />
    </div>
  );
};
