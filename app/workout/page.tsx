'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import Button from '@/components/ui/Button';
import CameraPreview from '@/components/camera/CameraPreview';
import { useCamera } from '@/hooks/useCamera';

// TEMP: replaced in Prompt 4
export default function WorkoutPage() {
  const { videoRef, stream, isLoading, error, startCamera, stopCamera } = useCamera();

  return (
    <PageWrapper>
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white">Screen 3 — Camera Setup</h1>
          <p className="mt-3 text-sm text-gray-400">Placeholder — implementation coming</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" onClick={startCamera} disabled={isLoading}>
            Test Camera
          </Button>
          {stream && (
            <Button variant="secondary" onClick={stopCamera}>
              Stop Camera
            </Button>
          )}
        </div>

        <CameraPreview videoRef={videoRef} isLoading={isLoading} error={error} />

        {error && <p className="text-center text-sm text-red-400">{error}</p>}
      </div>
    </PageWrapper>
  );
}
