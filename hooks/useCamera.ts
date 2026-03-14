'use client';

import { RefObject, useCallback, useRef, useState } from 'react';

type UseCameraResult = {
  videoRef: RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  isLoading: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
};

function mapCameraError(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
      return 'Camera permission denied';
    }

    if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
      return 'Camera not found';
    }

    if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      return 'Camera already in use';
    }

    return `Camera error: ${error.message || error.name}`;
  }

  if (error instanceof Error) {
    return `Camera error: ${error.message}`;
  }

  return 'Camera error: Unknown error';
}

export function useCamera(): UseCameraResult {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    setStream((currentStream) => {
      currentStream?.getTracks().forEach((track) => track.stop());
      return null;
    });

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, []);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    stopCamera();

    try {
      if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices?.enumerateDevices) {
        throw new Error('Media devices API is not available in this browser');
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideoInput = devices.some((device) => device.kind === 'videoinput');

      if (!hasVideoInput) {
        setError('Camera not found');
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      setStream(mediaStream);
    } catch (caughtError) {
      setError(mapCameraError(caughtError));
    } finally {
      setIsLoading(false);
    }
  }, [stopCamera]);

  return {
    videoRef,
    stream,
    isLoading,
    error,
    startCamera,
    stopCamera,
  };
}
