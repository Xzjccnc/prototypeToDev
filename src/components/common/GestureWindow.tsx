import { useState, useEffect, useRef } from "react";
import { useGestureRecognition } from "@/hooks/useGestureRecognition";
import { GESTURE_ICON_MAP, GESTURE_LABEL_MAP } from "@/icons/gestureIcons";

interface GestureWindowProps {
  onGestureDetected: (gesture: string) => void;
  heightClass?: string;
  absolute?: boolean;
  hideCamera?: boolean;
}

interface GestureHistoryItem {
  id: number;
  label: string;
}

const SLOT_STYLES = [
  { widthPct: 100, heightPx: 56, opacity: 1, fontSize: 22 },
  { widthPct: 60, heightPx: 34, opacity: 0.4, fontSize: 16 },
  { widthPct: 36, heightPx: 20, opacity: 0.15, fontSize: 11 },
] as const;

export function GestureWindow({
  onGestureDetected,
  heightClass = "h-[652px]",
  absolute = false,
  hideCamera = false,
}: GestureWindowProps) {
  const [currentGesture, setCurrentGesture] = useState<string | null>(null);
  const [gestureHistory, setGestureHistory] = useState<GestureHistoryItem[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastGestureRef = useRef<string | null>(null);
  const historyIdRef = useRef(0);

  useGestureRecognition(videoRef, (gesture) => {
    if (GESTURE_ICON_MAP[gesture] && gesture !== lastGestureRef.current) {
      lastGestureRef.current = gesture;
      setCurrentGesture(gesture);
      historyIdRef.current += 1;
      const id = historyIdRef.current;
      const label = GESTURE_LABEL_MAP[gesture] ?? gesture;
      setGestureHistory((prev) => [{ id, label }, ...prev].slice(0, 3));
    }
    onGestureDetected(gesture);
  });

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function setupCamera() {
      console.log("[GestureWindow] Starting camera setup...");

      if (!navigator.mediaDevices?.getUserMedia) {
        console.error("[GestureWindow] Camera API not available — requires localhost or HTTPS.");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
        });

        const tracks = stream.getVideoTracks();
        console.log(
          `[GestureWindow] getUserMedia OK — ${tracks.length} video track(s):`,
          tracks.map((t) => ({ label: t.label, enabled: t.enabled, readyState: t.readyState })),
        );

        if (cancelled) {
          console.log("[GestureWindow] Component unmounted during setup; stopping stream.");
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        const video = videoRef.current;
        if (!video) {
          console.error("[GestureWindow] videoRef.current is null after getUserMedia.");
          return;
        }

        video.srcObject = stream;
        console.log("[GestureWindow] stream attached to <video>. Waiting for loadedmetadata...");

        video.onloadedmetadata = () => {
          console.log(
            `[GestureWindow] loadedmetadata fired — videoWidth=${video.videoWidth}, videoHeight=${video.videoHeight}`,
          );
          video
            .play()
            .then(() => console.log("[GestureWindow] video.play() resolved OK."))
            .catch((e) => console.error("[GestureWindow] video.play() rejected:", e));
        };

        video.onerror = () => {
          console.error("[GestureWindow] <video> error event:", video.error);
        };
      } catch (err) {
        console.error("[GestureWindow] getUserMedia failed:", err);
      }
    }

    setupCamera();

    return () => {
      cancelled = true;
      if (stream) {
        console.log("[GestureWindow] Cleanup — stopping stream tracks.");
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const containerClass = absolute
    ? `absolute isolate flex flex-col gap-[12px] items-center left-0 min-w-[300px] overflow-clip p-[12px] rounded-[24px] top-[-6px] w-[300px] ${heightClass}`
    : `isolate flex flex-col gap-[12px] items-center min-w-[300px] overflow-clip p-[12px] relative rounded-[24px] shrink-0 w-[300px] ${heightClass}`;

  return (
    <div className={containerClass} data-name="手势窗">
      {/* Background tint — z-0, no blend mode, no backdrop-filter */}
      <div
        aria-hidden="true"
        className="absolute z-0 bg-gradient-to-b from-[rgba(34,50,75,0.55)] to-[rgba(59,62,78,0.5)] inset-0 pointer-events-none rounded-[24px]"
      />

      {/* Gesture History Label Area */}
      <div className="relative z-10 h-[160px] w-full overflow-hidden flex flex-col-reverse items-center justify-start gap-[8px] shrink-0">
        {gestureHistory.map((item, i) => {
          const slot = SLOT_STYLES[Math.min(i, 2)];
          return (
            <div
              key={item.id}
              className="overflow-clip relative flex items-center justify-center rounded-[39px] transition-all duration-500 ease-in-out"
              style={{ width: `${slot.widthPct}%`, height: `${slot.heightPx}px`, opacity: slot.opacity }}
            >
              <div
                aria-hidden="true"
                className="absolute bg-[rgba(38,38,38,0.72)] inset-0 pointer-events-none rounded-[39px]"
              />
              <p
                className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic text-white whitespace-nowrap transition-all duration-500 ease-in-out"
                style={{ fontSize: `${slot.fontSize}px` }}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Camera Feed */}
      {!hideCamera && (
        <div className="relative z-10 bg-black/30 h-[167px] overflow-hidden rounded-[24px] shrink-0 w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      )}

      {/* Gesture Icon Display */}
      <div className="relative z-10 flex-1 min-h-0 overflow-clip rounded-[24px] w-full">
        <div
          aria-hidden="true"
          className="absolute bg-[rgba(35,35,35,0.5)] inset-0 pointer-events-none rounded-[24px]"
        />
        <div className="absolute inset-0 flex items-center justify-center" data-name="手势">
          <div className="h-[152px] w-[130px] flex items-center justify-center">
            {currentGesture && GESTURE_ICON_MAP[currentGesture] ? (
              <img
                key={currentGesture}
                src={GESTURE_ICON_MAP[currentGesture]}
                alt={GESTURE_LABEL_MAP[currentGesture] ?? currentGesture}
                className="w-full h-full object-contain transition-opacity duration-300"
                style={{ filter: "invert(1) brightness(0.88)" }}
              />
            ) : (
              <svg
                className="w-full h-full opacity-20"
                fill="none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle cx="50" cy="50" r="30" stroke="#D9D9D9" strokeWidth="3" strokeDasharray="6 4" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
