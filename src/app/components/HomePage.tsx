import { useState, useEffect, useRef } from "react";
import svgPaths from "../../imports/svg-aqo9iitdhs";
import img from "figma:asset/51f4b2dc353102219050504782ad446e7199fcb1.png";
import img1 from "figma:asset/db85ce748e0e50fb1dd3b019004adb2ab53b0657.png";
import { PageSidebar } from "./PageSidebar";
import { useGestureRecognition } from "../hooks/useGestureRecognition";

type Page = "home" | "nav" | "device" | "music";
interface HomePageProps { onNavigate: (page: Page) => void; }

/* ── Status Bar ── */
function StatusBar() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[44px] relative shrink-0 w-full" data-name="状态栏">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[32px] py-[8px] relative size-full">
          <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
            {/* WiFi */}
            <div className="relative shrink-0 size-[32px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.p10af9980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
            {/* Signal */}
            <div className="h-[24px] relative shrink-0 w-[26px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
                <path d={svgPaths.p317f9600} fill="white" />
              </svg>
            </div>
            {/* Bluetooth */}
            <div className="h-[32px] relative shrink-0 w-[31px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 32">
                <path d={svgPaths.p22c86100} fill="white" />
              </svg>
            </div>
            {/* Battery */}
            <div className="content-stretch flex flex-col items-center justify-center overflow-clip py-[10px] relative shrink-0 size-[32px]">
              <div className="h-[12.373px] relative shrink-0 w-[25.997px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.9975 12.3729">
                  <path d={svgPaths.p26f40c00} fill="white" />
                  <path d={svgPaths.p2a89e280} fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar ── */
function SidebarHomeIcon() {
  return (
    <div className="bg-[#5849ff] content-stretch flex flex-col gap-[8px] items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0">
      <div className="relative shrink-0 size-[72px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
          <path d={svgPaths.p2ac9c800} fill="white" fillOpacity="0.85098" />
        </svg>
      </div>
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">主页</p>
    </div>
  );
}

function SidebarNavIcon() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0">
      <div className="relative shrink-0 size-[72px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
          <path d={svgPaths.p3adeba00} fill="white" />
        </svg>
      </div>
      <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">导航</p>
    </div>
  );
}

function SidebarDeviceIcon() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0">
      <div className="relative shrink-0 size-[72px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
          <path d={svgPaths.p3da8c300} stroke="white" strokeOpacity="0.85098" strokeWidth="3.2" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[28px] text-center text-[rgba(255,255,255,0.85)] whitespace-nowrap">
        <p className="leading-none">设备</p>
      </div>
    </div>
  );
}

function SidebarMusicIcon() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[24px] shrink-0">
      <div className="relative shrink-0 size-[72px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
          <path d={svgPaths.pc6ab100} fill="white" fillOpacity="0.85098" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[28px] text-center text-[rgba(255,255,255,0.85)] whitespace-nowrap">
        <p className="leading-none">音乐</p>
      </div>
    </div>
  );
}

/* ── Gesture Window ── */
function GestureWindow({ onGestureDetected }: { onGestureDetected: (gesture: string) => void }) {
  const gestures = ["手掌闭合", "手掌张开", "单指滑动", "双指滑动", "手势旋转"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGestureRecognition(videoRef, (gesture) => {
    // Map gestures to currentIndex so the UI rolls
    if (gesture === "Closed_Fist") setCurrentIndex(0);
    else if (gesture === "Open_Palm") setCurrentIndex(1);
    else if (gesture === "Swipe_Up" || gesture === "Swipe_Down") setCurrentIndex(1);
    else if (gesture === "Pointing_Up") setCurrentIndex(2);
    else if (gesture === "Victory" || gesture === "ILoveYou") setCurrentIndex(3);
    else if (gesture === "Thumb_Up" || gesture === "Thumb_Down") setCurrentIndex(4);
    
    // Bubble the gesture up for actual control
    onGestureDetected(gesture);
  }, 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      // Disabled ambient scroll
    }, 2000);
    return () => clearInterval(timer);
  }, [gestures.length]);

  // Camera setup
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function setupCamera() {
      try {
        // First check if mediaDevices is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("Camera API not supported in this browser. You may need to use localhost or HTTPS.");
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user" 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Ensure play is called after metadata is loaded to avoid some browser policies
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(e => console.error("Error playing video:", e));
          };
        }
      } catch (err) {
        console.error("Error accessing camera. Please ensure you have granted camera permissions:", err);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="content-stretch flex flex-col h-[652px] items-center justify-between min-w-[300px] overflow-clip p-[12px] relative rounded-[24px] shrink-0 w-[300px]" data-name="手势窗">
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
      
      {/* Roller Labels */}
      <div className="relative h-[160px] w-full overflow-hidden flex flex-col items-center justify-center shrink-0">
        <div 
          className="absolute w-full flex flex-col items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(calc(50% - ${currentIndex * 54 + 27}px))` }}
        >
          {gestures.map((gesture, idx) => {
            const isCenter = idx === currentIndex;
            
            const opacity = isCenter ? "opacity-98" : "opacity-50";
            const scale = isCenter ? "scale-110" : "scale-90";
            const bgAlpha = isCenter ? "rgba(38,38,38,0.72)" : "rgba(7,31,36,0.28)";
            const textAlpha = isCenter ? "opacity-90" : "opacity-77";
            const fontSize = isCenter ? "text-[28px]" : "text-[24px]";
            const width = isCenter ? "w-[271px]" : "w-[212px]";
            const height = isCenter ? "h-[69px]" : "h-[54px]";
            const my = isCenter ? "my-[8px]" : "my-[4px]";

            return (
              <div 
                key={idx} 
                className={`relative overflow-clip rounded-[39px] flex items-center justify-center transition-all duration-500 ease-in-out ${width} ${height} ${my} ${opacity} ${scale}`}
              >
                <div aria-hidden="true" className="absolute backdrop-blur-[2px] inset-0 mix-blend-multiply pointer-events-none rounded-[39px]" style={{ backgroundColor: bgAlpha }} />
                <p className={`absolute capitalize font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic ${textAlpha} ${fontSize} text-white whitespace-nowrap transition-all duration-500 ease-in-out`}>
                  {gesture}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Camera Panel */}
      <div className="bg-[rgba(35,35,35,0.5)] h-[167px] relative overflow-hidden mix-blend-multiply rounded-[24px] shrink-0 w-full">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
      {/* Hand gesture panel */}
      <div className="h-[330px] overflow-clip relative rounded-[24px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
        <div className="absolute left-0 overflow-clip rounded-[32px] size-[276px] top-[33px]" data-name="手势">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[152px] left-[calc(50%+1px)] top-[calc(50%+1px)] w-[130px]" data-name="手掌">
            {/* Gesture Icons Mapping */}
            {currentIndex === 0 && (
              // 手掌闭合 (Fist/Closed Hand) - 从提供的图标中提取的拳头
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
              // 手掌张开 (Open Hand - Original path)
              <div className="absolute inset-[-0.57%_-0.75%_-1.22%_0.11%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130.824 154.72">
                  <path d={svgPaths.p20178480} fill="#262626" stroke="#D9D9D9" strokeWidth="2" />
                </svg>
              </div>
            )}
            {currentIndex === 2 && (
              // 单指滑动 (One Finger Swipe) - 从提供的图标中提取的带箭头的单指
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path d="M38,45 L30,20 C28,15 32,10 38,12 C42,14 45,18 48,25 L58,45 C65,48 70,50 78,65 C85,80 75,95 60,95 C45,95 35,85 30,70 C28,65 28,55 38,45 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinejoin="round" />
                <path d="M48,25 L55,40" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M12,45 C8,35 12,20 22,15" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M15,15 L22,15 L22,22" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {currentIndex === 3 && (
              // 双指滑动 (Two Fingers Swipe) - 从提供的图标中提取的带箭头的双指
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path d="M45,48 L35,20 C32,15 38,10 42,12 C46,14 48,18 52,28 L60,45 C65,48 70,50 75,65 C82,80 72,95 55,95 C40,95 32,85 28,70 C25,65 25,55 35,45 L25,20 C22,15 28,10 32,12 C36,14 38,18 42,28 L45,48 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinejoin="round" />
                <path d="M52,28 L58,40" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M18,70 C12,60 15,45 22,35" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M15,35 L22,35 L22,42" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {currentIndex === 4 && (
              // 手势旋转 (Gesture Rotate)
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

/* ── Speed Card ── */
function SpeedCard() {
  const [speed, setSpeed] = useState(1.7);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const delta = (Math.random() - 0.5) * 4; 
        const newSpeed = Math.max(0, Math.min(120, prev + delta));
        return parseFloat(newSpeed.toFixed(1));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backdrop-blur-[25px] bg-gradient-to-b content-stretch flex font-['PingFang_SC:Regular',sans-serif] from-[rgba(34,50,75,0.3)] h-[148px] items-center justify-between not-italic px-[48px] py-[12px] relative rounded-[24px] shrink-0 text-center text-white to-[48.558%] to-[rgba(59,62,78,0.3)] w-[360px] whitespace-nowrap" data-name="右下-速度">
      <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0">
        <p className="leading-[0] relative shrink-0 text-[0px]">
          <span className="leading-[normal] text-[40px]">{speed}</span>
          <span className="leading-[normal] text-[20px]">km/h</span>
        </p>
        <p className="leading-[normal] relative shrink-0 text-[20px]">当前车速</p>
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0">
        <p className="leading-[0] relative shrink-0 text-[0px]">
          <span className="leading-[normal] text-[40px]">0.24</span>
          <span className="leading-[normal] text-[20px]">kwh</span>
        </p>
        <p className="leading-[normal] relative shrink-0 text-[20px]">耗电量</p>
      </div>
    </div>
  );
}

/* ── Search + Quick Nav ── */
function SearchAndNav() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-[1_0_0] flex-col from-[rgba(34,50,75,0.3)] items-start min-h-px min-w-px relative rounded-[24px] to-[48.558%] to-[rgba(59,62,78,0.3)]">
      {/* Search bar */}
      <div className="backdrop-blur-[25px] relative shrink-0 w-full rounded-t-[24px]">
        <div className="flex flex-row items-center size-full rounded-t-[24px] overflow-hidden">
          <div className="content-stretch flex items-center px-[24px] py-[6px] relative w-full">
            <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center justify-between min-h-px min-w-px relative">
              <div className="content-stretch flex items-center justify-center relative shrink-0">
                <div className="relative shrink-0 size-[72px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
                    <mask fill="white" id="searchmask">
                      <path d={svgPaths.p2096c180} />
                    </mask>
                    <path d={svgPaths.p2096c180} fill="white" />
                    <path d={svgPaths.p29600a00} fill="black" mask="url(#searchmask)" />
                  </svg>
                </div>
                <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.75)] text-center whitespace-nowrap">搜索</p>
              </div>
              <div className="relative shrink-0 size-[72px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
                  <path d={svgPaths.p10775f00} stroke="white" strokeLinecap="round" strokeOpacity="0.75" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 524 1">
            <path d="M4 0.5H520" stroke="#FDFDFD" strokeOpacity="0.121569" />
          </svg>
        </div>
      </div>
      {/* Quick shortcuts */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[61px] items-center justify-center px-[24px] relative w-full">
            {/* 住宅 */}
            <div className="content-stretch flex gap-[12px] items-center justify-center min-h-[64px] relative shrink-0">
              <div className="relative shrink-0 size-[48px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                  <path d={svgPaths.p32a092f0} fill="white" />
                </svg>
              </div>
              <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">住宅</p>
            </div>
            {/* 公司 */}
            <div className="content-stretch flex gap-[12px] items-center justify-center min-h-[64px] relative shrink-0 w-[120px]">
              <div className="relative shrink-0 size-[48px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                  <path d={svgPaths.p3b34c100} fill="white" />
                </svg>
              </div>
              <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">公司</p>
            </div>
            {/* 常用 */}
            <div className="content-stretch flex gap-[12px] items-center justify-center min-h-[64px] relative shrink-0 w-[120px]">
              <div className="relative shrink-0 size-[48px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                  <path d={svgPaths.p3b34c100} fill="white" />
                </svg>
              </div>
              <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">常用</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Center Section (Speed + Search) ── */
function CenterSection() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[18px] items-center justify-center px-[18px] relative w-full">
          <SpeedCard />
          <SearchAndNav />
        </div>
      </div>
    </div>
  );
}

/* ── Weather Card ── */
function WeatherCard() {
  return (
    <div className="bg-gradient-to-b from-[rgba(34,50,75,0.3)] h-full min-h-0 min-w-px relative rounded-[32px] to-[48.558%] to-[rgba(59,62,78,0.3)] w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pt-[32px] relative size-full">
          {/* Weather top row */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[48px] relative w-full">
                <div className="content-stretch flex flex-col font-['PingFang_SC:Bold',sans-serif] gap-[24px] items-start not-italic relative shrink-0 text-center text-white tracking-[2px] w-[140px]">
                  <div className="flex flex-col justify-end leading-[0] min-w-full relative shrink-0 text-[64px] w-[min-content]">
                    <p className="leading-none">34℃</p>
                  </div>
                  <p className="leading-none relative shrink-0 text-[24px] whitespace-nowrap">晴间多云</p>
                </div>
                {/* Cloud SVG */}
                <div className="h-[156.568px] relative shrink-0 w-[233.755px]">
                  <div className="absolute inset-[0_-1.71%_-5.11%_-1.71%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 241.755 164.568">
                      <path clipRule="evenodd" d={svgPaths.pe043580} fill="#FFBB00" fillOpacity="0.86" fillRule="evenodd" />
                      <g filter="url(#cloudf)">
                        <path clipRule="evenodd" d={svgPaths.p33185380} fill="url(#cloudg)" fillRule="evenodd" />
                      </g>
                      <defs>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="152.309" id="cloudf" width="241.755" x="0" y="12.2586">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.835208 0 0 0 0 0.858067 0 0 0 0 0.879167 0 0 0 0.25 0" />
                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1" />
                          <feBlend in="SourceGraphic" in2="effect1" mode="normal" result="shape" />
                        </filter>
                        <linearGradient gradientUnits="userSpaceOnUse" id="cloudg" x1="120.878" x2="120.878" y1="12.2586" y2="156.568">
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="#FEFFCE" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Weather bottom row */}
          <div className="bg-[rgba(255,255,255,0.25)] relative rounded-[32px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[36px] py-[23px] relative w-full">
                <div className="content-stretch flex gap-[18px] items-center min-w-[200px] relative shrink-0">
                  <div className="relative shrink-0 size-[48px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                      <path d={svgPaths.p15dd4900} fill="white" />
                    </svg>
                  </div>
                  <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-none min-h-px min-w-px not-italic relative text-[24px] text-center text-white tracking-[2px]">28km/h</p>
                </div>
                <div className="content-stretch flex gap-[18px] items-center min-w-[200px] relative shrink-0">
                  <div className="relative shrink-0 size-[48px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                      <path d={svgPaths.p28391980} fill="white" />
                    </svg>
                  </div>
                  <p className="flex-[1_0_0] font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-none min-h-px min-w-px not-italic relative text-[24px] text-center text-white tracking-[2px]">40%可见度</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini Music Player ── */
function MiniMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-gradient-to-b from-[rgba(34,50,75,0.3)] h-full min-h-0 min-w-px relative rounded-[32px] to-[48.558%] to-[rgba(59,62,78,0.3)] w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between py-[36px] relative size-full">
          {/* Album + info */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[24px] relative w-full">
                <div className="relative rounded-[32px] shrink-0 size-[160px]">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full" src={img1} />
                </div>
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[290px]">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center leading-[normal] not-italic overflow-clip relative shrink-0 text-white whitespace-nowrap">
                      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal relative shrink-0 text-[32px]">抬头看看好吗</p>
                      <p className="font-['Inter:Light','Noto_Sans_JP:Light',sans-serif] font-light relative shrink-0 text-[20px] text-center">杜宣达</p>
                    </div>
                    <div className="overflow-clip relative shrink-0 size-[48px] cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}>
                      <div className="absolute inset-[12.5%_8.33%]">
                        <svg className="absolute block size-full" fill={isFavorite ? "#ff3b30" : "none"} preserveAspectRatio="none" viewBox="0 0 39.9994 36.0019">
                          <path d={svgPaths.p32b81f0} stroke={isFavorite ? "#ff3b30" : "white"} />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Controls */}
                  <div className="relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between px-[12px] relative w-full">
                        <div className="overflow-clip relative shrink-0 size-[72px]">
                          <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2135 43.2096">
                              <path d={svgPaths.p1d2b7b80} fill="white" fillOpacity="0.85098" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative shrink-0 size-[72px] cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>
                          <div className="absolute inset-[12.5%]">
                            {isPlaying ? (
                              <svg className="absolute block size-full" fill="white" preserveAspectRatio="none" viewBox="0 0 24 24">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                              </svg>
                            ) : (
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 54">
                                <path d={svgPaths.peda9000} fill="white" fillOpacity="0.85098" />
                                <path d={svgPaths.p1a0f6900} fill="white" fillOpacity="0.85098" />
                                <path d={svgPaths.p195c6000} fill="white" fillOpacity="0.85098" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="relative shrink-0 size-[72px]">
                          <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2137 43.2096">
                              <path d={svgPaths.p3cee5200} fill="white" fillOpacity="0.85098" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Progress */}
          <div className="h-[30px] relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[44px] items-center justify-center p-[24px] relative size-full">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">0:00</p>
                <div className="flex-[1_0_0] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative">
                  <div className="bg-[rgba(35,35,35,0.5)] col-1 h-[18px] ml-0 mt-0 rounded-[25px] row-1 w-full" />
                  <div className="bg-[#3c34d9] col-1 h-[18px] ml-0 mt-0 rounded-[25px] row-1 w-[52.13%]" />
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">3:14</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Right Panel ── */
function RightPanel({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-full items-start relative shrink-0 w-[540px]">
      <div className="flex-[1_1_0] min-h-0 w-full">
        <WeatherCard />
      </div>
      <div className="cursor-pointer flex-[1_1_0] min-h-0 w-full hover:opacity-90 transition-opacity" onClick={() => onNavigate("music")}>
        <MiniMusicPlayer />
      </div>
    </div>
  );
}

/* ── Main content ── */
function MainContent({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="content-stretch flex h-full items-end justify-between relative rounded-[32px] shrink-0 w-[1778px]">
      <GestureWindow onGestureDetected={(gesture) => {
        if (gesture === "Swipe_Up" || gesture === "Swipe_Down") {
          onNavigate?.("music"); // Swipe up/down switches to music page
        } else if (gesture === "Victory" || gesture === "ILoveYou") {
          onNavigate?.("music"); // Switch to music page from home
        } else if (gesture === "Pointing_Up") {
          onNavigate?.("nav"); // Switch to nav page from home
        }
      }} />
      <CenterSection />
      <RightPanel onNavigate={onNavigate} />
    </div>
  );
}

/* ── Page Root ── */
export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="主页">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
      <StatusBar />
      {/* Main area */}
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
            {/* Sidebar */}
            <PageSidebar activePage="home" onNavigate={onNavigate} dataName="侧边栏" />
            <MainContent onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </div>
  );
}
