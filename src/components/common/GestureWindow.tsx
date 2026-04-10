import { useState, useEffect, useRef } from "react";
import { useGestureRecognition } from "@/hooks/useGestureRecognition";
import commonIcons from "@/icons/commonIcons";

interface GestureWindowProps {
  onGestureDetected: (gesture: string) => void;
  heightClass?: string;
  absolute?: boolean;
}

interface GestureHistoryItem {
  id: number;
  label: string;
}

const GESTURE_LABELS = ["手掌闭合", "手掌张开", "单指滑动", "双指滑动", "手势旋转"];

function gestureToIndex(gesture: string): number | null {
  if (gesture === "Closed_Fist") return 0;
  if (gesture === "Open_Palm" || gesture === "Swipe_Up" || gesture === "Swipe_Down") return 1;
  if (gesture === "Pointing_Up") return 2;
  if (gesture === "Victory" || gesture === "ILoveYou") return 3;
  if (gesture === "Thumb_Up" || gesture === "Thumb_Down") return 4;
  return null;
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
}: GestureWindowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gestureHistory, setGestureHistory] = useState<GestureHistoryItem[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastIdxRef = useRef<number | null>(null);
  const historyIdRef = useRef(0);

  useGestureRecognition(videoRef, (gesture) => {
    const idx = gestureToIndex(gesture);
    if (idx !== null && idx !== lastIdxRef.current) {
      lastIdxRef.current = idx;
      setCurrentIndex(idx);
      historyIdRef.current += 1;
      const id = historyIdRef.current;
      const label = GESTURE_LABELS[idx];
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

      {/* Gesture Icon Display */}
      <div className="relative z-10 flex-1 min-h-0 overflow-clip rounded-[24px] w-full">
        <div
          aria-hidden="true"
          className="absolute bg-[rgba(35,35,35,0.5)] inset-0 pointer-events-none rounded-[24px]"
        />
        <div className="absolute left-0 overflow-clip rounded-[32px] size-[276px] top-[33px]" data-name="手势">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[152px] left-[calc(50%+1px)] top-[calc(50%+1px)] w-[130px]">
            {currentIndex === 0 && (
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path d="M28,30 C20,38 12,48 10,60 C15,80 35,95 55,95 C75,95 85,80 88,60 C90,40 75,25 65,22 C60,20 50,22 40,25 C35,28 32,29 28,30 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinejoin="round" />
                <path d="M28,30 C30,22 35,18 42,18 C50,18 55,22 55,28" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M40,25 C42,15 48,10 55,10 C65,10 70,15 70,25" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M55,28 C58,18 65,12 75,15 C82,18 85,25 82,35" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M38,35 C45,32 55,30 65,35 C70,38 75,45 72,50 C68,55 58,58 50,55" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M38,35 C32,45 40,55 48,50" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M50,55 C55,60 65,58 68,52" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {currentIndex === 1 && (
              <div className="absolute inset-[-0.57%_-0.75%_-1.22%_0.11%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130.824 154.72">
                  <path d={commonIcons.p20178480} fill="#262626" stroke="#D9D9D9" strokeWidth="2" />
                </svg>
              </div>
            )}
            {currentIndex === 2 && (
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path d="M38,45 L30,20 C28,15 32,10 38,12 C42,14 45,18 48,25 L58,45 C65,48 70,50 78,65 C85,80 75,95 60,95 C45,95 35,85 30,70 C28,65 28,55 38,45 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinejoin="round" />
                <path d="M48,25 L55,40" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M12,45 C8,35 12,20 22,15" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M15,15 L22,15 L22,22" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {currentIndex === 3 && (
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path d="M45,48 L35,20 C32,15 38,10 42,12 C46,14 48,18 52,28 L60,45 C65,48 70,50 75,65 C82,80 72,95 55,95 C40,95 32,85 28,70 C25,65 25,55 35,45 L25,20 C22,15 28,10 32,12 C36,14 38,18 42,28 L45,48 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinejoin="round" />
                <path d="M52,28 L58,40" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M18,70 C12,60 15,45 22,35" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M15,35 L22,35 L22,42" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {currentIndex === 4 && (
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 130 154">
                <path d="M65 40 L 65 90 C 65 110, 50 120, 50 140 C 70 150, 90 140, 95 110 L 105 80 C 110 70, 90 60, 85 75 L 80 85 L 80 50 C 80 40, 65 40, 65 50 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 60 A 20 20 0 1 1 50 80" fill="none" stroke="#D9D9D9" strokeWidth="4" strokeLinecap="round" />
                <path d="M45 75 L 50 80 L 55 75" fill="none" stroke="#D9D9D9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
