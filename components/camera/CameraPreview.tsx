'use client';

import { RefObject } from 'react';

type CameraPreviewProps = {
  videoRef: RefObject<HTMLVideoElement>;
  isLoading: boolean;
  error: string | null;
  mirrored?: boolean;
};

export default function CameraPreview({
  videoRef,
  isLoading,
  error,
  mirrored = true,
}: CameraPreviewProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="aspect-[4/3] w-full object-cover"
        style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white"
            aria-label="Loading camera"
          />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/75 px-4 text-center">
          <p className="text-lg font-semibold text-red-500">Camera Error</p>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
