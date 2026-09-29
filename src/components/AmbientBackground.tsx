import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* Top-Right Soft Champagne Glow */}
      <div
        className="ambient-blob-1 absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.06) 0%, rgba(216, 189, 122, 0.02) 65%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Bottom-Left Soft Burgundy Glow */}
      <div
        className="ambient-blob-2 absolute -bottom-28 -left-28 w-[520px] h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(107, 31, 42, 0.04) 0%, rgba(69, 19, 27, 0.015) 60%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
};
