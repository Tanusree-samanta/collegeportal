import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* Top-Right Soft Royal Blue Glow */}
      <div
        className="ambient-blob-1 absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 87, 184, 0.05) 0%, rgba(247, 249, 252, 0.6) 60%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Bottom-Left Soft Institutional Navy Tint */}
      <div
        className="ambient-blob-2 absolute -bottom-28 -left-28 w-[520px] h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 59, 104, 0.04) 0%, rgba(247, 249, 252, 0.6) 60%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
};
