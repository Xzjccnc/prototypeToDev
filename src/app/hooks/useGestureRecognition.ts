import { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, GestureRecognizer, GestureRecognizerResult } from '@mediapipe/tasks-vision';

type GestureCallback = (gestureName: string) => void;

let recognizer: GestureRecognizer | null = null;

export function useGestureRecognition(
  videoRef: React.RefObject<HTMLVideoElement>,
  onGesture: GestureCallback,
  cooldownMs: number = 1000
) {
  const [isReady, setIsReady] = useState(false);
  const lastGestureTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();
  
  // Hand tracking for swipes
  const lastHandPosRef = useRef<{x: number, y: number, time: number} | null>(null);
  const openPalmDurationRef = useRef<number>(0);

  // Initialize the recognizer once
  useEffect(() => {
    let active = true;

    async function init() {
      if (recognizer) {
        setIsReady(true);
        return;
      }
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const newRecognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        if (active) {
          recognizer = newRecognizer;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Failed to initialize MediaPipe Gesture Recognizer", err);
      }
    }

    init();

    return () => {
      active = false;
    };
  }, []);

  // Run the detection loop
  const detect = useCallback(() => {
    if (!videoRef.current || !recognizer || videoRef.current.readyState !== 4) {
      requestRef.current = requestAnimationFrame(detect);
      return;
    }

    const nowInMs = Date.now();
    const results = recognizer.recognizeForVideo(videoRef.current, nowInMs);

    if (results.gestures && results.gestures.length > 0) {
      const gesture = results.gestures[0][0].categoryName;
      const landmarks = results.landmarks[0];
      
      // Filter out 'None' or low-confidence
      if (gesture !== 'None' && gesture !== '') {
        let finalGesture = gesture;

        // Process swipe if Open_Palm
        if (gesture === 'Open_Palm' && landmarks && landmarks.length > 0) {
          // Use wrist (landmark 0) or middle finger mcp (landmark 9) as reference point
          const currentPos = { x: landmarks[9].x, y: landmarks[9].y, time: nowInMs };
          
          if (lastHandPosRef.current) {
            const dy = currentPos.y - lastHandPosRef.current.y;
            const dt = currentPos.time - lastHandPosRef.current.time;
            
            // Calculate velocity (y-axis is top-down in image coords)
            const velocityY = dy / dt;
            
            // Thresholds for swipe
            if (velocityY < -0.001) {
              finalGesture = 'Swipe_Up';
              lastHandPosRef.current = null; // reset after triggering
            } else if (velocityY > 0.001) {
              finalGesture = 'Swipe_Down';
              lastHandPosRef.current = null; // reset after triggering
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

        // Delay static Open_Palm trigger to allow swipe detection
        const isStaticOpenPalm = finalGesture === 'Open_Palm';
        const shouldTriggerStatic = isStaticOpenPalm && openPalmDurationRef.current > 15; // roughly 0.5s at 30fps
        
        if (!isStaticOpenPalm || shouldTriggerStatic) {
          if (nowInMs - lastGestureTimeRef.current > cooldownMs) {
            lastGestureTimeRef.current = nowInMs;
            onGesture(finalGesture);
            if (shouldTriggerStatic) {
               openPalmDurationRef.current = 0; // reset after triggering
            }
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
  }, [onGesture, cooldownMs, videoRef]);

  useEffect(() => {
    if (isReady) {
      requestRef.current = requestAnimationFrame(detect);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isReady, detect]);

  return { isReady };
}