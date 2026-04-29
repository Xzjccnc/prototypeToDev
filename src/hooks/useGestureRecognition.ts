import { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import { GESTURE_COOLDOWN_MS } from '@/constants';

type GestureCallback = (gestureName: string) => void;

// Module-level promise cache: ensures the model is only loaded once across all mounts,
// including React Strict Mode double-invocation. The recognizer is intentionally never
// destroyed since the HMI app stays loaded for the lifetime of the session.
let _recognizer: GestureRecognizer | null = null;
let _initPromise: Promise<GestureRecognizer | null> | null = null;

async function getRecognizer(): Promise<GestureRecognizer | null> {
  if (_recognizer) return _recognizer;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );
      _recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      });
      return _recognizer;
    } catch (err) {
      console.error('Failed to initialize MediaPipe Gesture Recognizer:', err);
      _initPromise = null;
      return null;
    }
  })();

  return _initPromise;
}

export function useGestureRecognition(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onGesture: GestureCallback,
  cooldownMs: number = GESTURE_COOLDOWN_MS
) {
  const [isReady, setIsReady] = useState(false);
  const lastGestureTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const lastHandPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const openPalmDurationRef = useRef<number>(0);

  // Keep callback ref stable to avoid recreating detect loop on every render
  const onGestureRef = useRef(onGesture);
  useEffect(() => {
    onGestureRef.current = onGesture;
  });

  useEffect(() => {
    let active = true;
    getRecognizer().then((rec) => {
      if (active && rec) setIsReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const detect = useCallback(() => {
    const video = videoRef.current;
    if (!video || !_recognizer || video.readyState !== 4) {
      requestRef.current = requestAnimationFrame(detect);
      return;
    }

    const nowInMs = Date.now();
    const results = _recognizer.recognizeForVideo(video, nowInMs);

    if (results.gestures?.length > 0) {
      const gesture = results.gestures[0][0].categoryName;
      const landmarks = results.landmarks[0];

      if (gesture !== 'None' && gesture !== '') {
        let finalGesture = gesture;

        if (gesture === 'Open_Palm' && landmarks?.length > 0) {
          const currentPos = { x: landmarks[9].x, y: landmarks[9].y, time: nowInMs };
          if (lastHandPosRef.current) {
            const dy = currentPos.y - lastHandPosRef.current.y;
            const dt = currentPos.time - lastHandPosRef.current.time;
            const velocityY = dy / dt;
            if (velocityY < -0.001) {
              finalGesture = 'Swipe_Up';
              lastHandPosRef.current = null;
            } else if (velocityY > 0.001) {
              finalGesture = 'Swipe_Down';
              lastHandPosRef.current = null;
            } else {
              lastHandPosRef.current = currentPos;
            }
          } else {
            lastHandPosRef.current = currentPos;
          }
          openPalmDurationRef.current += 1;
        } else {
          lastHandPosRef.current = null;
          openPalmDurationRef.current = 0;
        }

        const isStaticOpenPalm = finalGesture === 'Open_Palm';
        const shouldTriggerStatic = isStaticOpenPalm && openPalmDurationRef.current > 15;

        if (!isStaticOpenPalm || shouldTriggerStatic) {
          if (nowInMs - lastGestureTimeRef.current > cooldownMs) {
            lastGestureTimeRef.current = nowInMs;
            onGestureRef.current(finalGesture);
            if (shouldTriggerStatic) openPalmDurationRef.current = 0;
          }
        }
      } else {
        lastHandPosRef.current = null;
        openPalmDurationRef.current = 0;
      }
    } else {
      lastHandPosRef.current = null;
      openPalmDurationRef.current = 0;
    }

    requestRef.current = requestAnimationFrame(detect);
  }, [cooldownMs, videoRef]);

  useEffect(() => {
    if (isReady) {
      requestRef.current = requestAnimationFrame(detect);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isReady, detect]);

  return { isReady };
}
