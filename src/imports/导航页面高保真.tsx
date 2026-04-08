import { useMemo, useState, useRef } from "react";
import type { FormEvent } from "react";
import svgPaths from "./svg-ujsdf0art7";
import img from "figma:asset/b1457bb4909c074b9ca61a20211a75f7d79e1703.png";
import img1 from "figma:asset/db85ce748e0e50fb1dd3b019004adb2ab53b0657.png";
import { PageSidebar } from "../app/components/PageSidebar";
import { useGestureRecognition } from "../app/hooks/useGestureRecognition";

function createBaiduMapUrl(query: string) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return "https://api.map.baidu.com/marker?location=104.066541,30.572269&title=%E5%A4%A9%E5%BA%9C%E5%B9%BF%E5%9C%BA&content=%E6%88%90%E9%83%BD%E5%B8%82%E5%A4%A9%E5%BA%9C%E5%B9%BF%E5%9C%BA&output=html&src=prototypeToDev";
  }

  return `https://api.map.baidu.com/place/search?query=${encodeURIComponent(trimmedQuery)}&region=%E5%85%A8%E5%9B%BD&output=html&src=prototypeToDev`;
}

function MapPanel({ mapUrl }: { mapUrl: string }) {
  return (
    <div className="absolute h-[456px] overflow-hidden right-0 rounded-[24px] top-0 w-[1002px] pointer-events-auto" style={{ pointerEvents: 'auto', zIndex: 10 }}>
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(35,35,35,0.35)] inset-0 pointer-events-none rounded-[24px]" />
      <iframe
        className="absolute inset-0 h-full w-full border-0 rounded-[24px]"
        style={{ pointerEvents: 'auto' }}
        src={mapUrl}
        title="百度地图"
      />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Frame 38">
          <path d={svgPaths.p10af9980} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="信号">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ä¿¡å·">
          <path d={svgPaths.p15960a70} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Frame 52">
          <path d={svgPaths.p22c86100} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[12.373px] relative shrink-0 w-[25.997px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.9975 12.3729">
        <g id="Group 1348">
          <path d={svgPaths.p26f40c00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p2a89e280} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip py-[10px] relative shrink-0 size-[32px]" data-name="电池电量 1">
      <Group1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
      <Frame3 />
      <Component2 />
      <Frame5 />
      <Component3 />
    </div>
  );
}

function Component1() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="状态栏">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[32px] py-[6px] relative size-full">
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Component1 />
    </div>
  );
}

function Component5() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="主页">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="ä¸»é¡µ">
          <path d={svgPaths.p2ac9c800} fill="var(--fill-0, white)" fillOpacity="0.85098" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="主页文字">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">主页</p>
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="主页">
      <Component5 />
      <Component6 />
    </div>
  );
}

function Component8() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="车况">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="è½¦åµ">
          <path d={svgPaths.p3adeba00} fill="var(--fill-0, white)" fillOpacity="0.85098" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="车况">
      <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">导航</p>
    </div>
  );
}

function Component7() {
  return (
    <div className="bg-[#5849ff] content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0" data-name="车况">
      <Component8 />
      <Component9 />
    </div>
  );
}

function Component11() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="设备 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="è®¾å¤ 1">
          <path d={svgPaths.p3da8c300} id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.85098" strokeWidth="3.2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">
        <p className="leading-none">设备</p>
      </div>
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0" data-name="设备">
      <Component11 />
      <Frame1 />
    </div>
  );
}

function Component13() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="音乐">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="é³ä¹">
          <path d={svgPaths.pc6ab100} fill="var(--fill-0, white)" fillOpacity="0.85098" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="音乐">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">
        <p className="leading-none">音乐</p>
      </div>
    </div>
  );
}

function Component12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="音乐">
      <Component13 />
      <Component14 />
    </div>
  );
}

/* ── Gesture Window (Ported from Home) ── */
function GestureWindow({ onGestureDetected }: { onGestureDetected: (gesture: string) => void }) {
  const gestures = ["手掌闭合", "手掌张开", "单指滑动", "双指滑动", "手势旋转"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGestureRecognition(videoRef, (gesture) => {
    if (gesture === "Closed_Fist") setCurrentIndex(0);
    else if (gesture === "Open_Palm") setCurrentIndex(1);
    else if (gesture === "Swipe_Up" || gesture === "Swipe_Down") setCurrentIndex(1);
    else if (gesture === "Pointing_Up") setCurrentIndex(2);
    else if (gesture === "Victory" || gesture === "ILoveYou") setCurrentIndex(3);
    else if (gesture === "Thumb_Up" || gesture === "Thumb_Down") setCurrentIndex(4);
    
    onGestureDetected(gesture);
  }, 1000);

  // Camera setup
  useMemo(() => {
    let stream: MediaStream | null = null;
    
    async function setupCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("Camera API not supported in this browser. You may need to use localhost or HTTPS.");
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(e => console.error("Error playing video:", e));
          };
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="absolute content-stretch flex flex-col h-[658px] items-center justify-between left-0 min-w-[300px] overflow-clip p-[12px] rounded-[24px] top-[-6px] w-[300px]" data-name="手势窗">
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
          className="absolute inset-0 w-full h-full object-cover -scale-x-100"
        />
      </div>

      {/* Hand gesture panel */}
      <div className="h-[330px] overflow-clip relative rounded-[24px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
        <div className="absolute left-0 overflow-clip rounded-[32px] size-[276px] top-[33px]" data-name="手势">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[152px] left-[calc(50%+1px)] top-[calc(50%+1px)] w-[130px]" data-name="手掌">
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
                  <path d={svgPaths.p20178480} fill="#262626" stroke="#D9D9D9" strokeWidth="2" />
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

function Frame14({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="content-stretch flex flex-col h-[652px] items-start relative shrink-0 w-[300px]">
      <GestureWindow onGestureDetected={(gesture) => {
        if (gesture === "Swipe_Up" || gesture === "Swipe_Down") {
          onNavigate?.("home"); // Swipe switches back to home
        } else if (gesture === "Victory" || gesture === "ILoveYou") {
          onNavigate?.("music"); // Nav switches to music on Victory
        } else if (gesture === "Pointing_Up") {
          onNavigate?.("home"); // Pointing up also goes to home
        }
      }} />
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="搜索icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="æç´¢icon">
          <g id="Union">
            <mask fill="white" id="path-2-inside-1_1_555">
              <path d={svgPaths.p21963c00} />
            </mask>
            <path d={svgPaths.p21963c00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1a4d1972} fill="var(--stroke-0, black)" mask="url(#path-2-inside-1_1_555)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame19({ searchValue, onSearchValueChange }: { searchValue: string; onSearchValueChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <SearchIcon />
      <input
        className="bg-transparent border-0 font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic outline-none relative shrink-0 text-[28px] text-[rgba(255,255,255,0.75)] text-center w-[220px]"
        onChange={(event) => onSearchValueChange(event.target.value)}
        placeholder="搜索"
        value={searchValue}
      />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 size-[72px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="Frame 1450">
          <path d={svgPaths.p10775f00} id="Vector 154" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeOpacity="0.75" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Frame20({ searchValue, onSearchValueChange }: { searchValue: string; onSearchValueChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame19 onSearchValueChange={onSearchValueChange} searchValue={searchValue} />
      <button className="bg-transparent border-0 p-0" type="submit">
        <Frame18 />
      </button>
    </div>
  );
}

function Component16({
  onSearchSubmit,
  onSearchValueChange,
  searchValue,
}: {
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSearchValueChange: (value: string) => void;
  searchValue: string;
}) {
  return (
    <form className="backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] content-stretch flex flex-col items-center justify-center py-[6px] relative rounded-[24px] shrink-0 w-full" data-name="搜索框" onSubmit={onSearchSubmit}>
      <Frame20 onSearchValueChange={onSearchValueChange} searchValue={searchValue} />
    </form>
  );
}

function Component17() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="地址 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="å°å 1">
          <path d={svgPaths.p2eab2d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame21({ onClick }: { onClick: () => void }) {
  return (
    <button className="bg-transparent border-0 col-1 content-stretch flex items-center justify-end ml-0 mt-0 p-0 relative row-1" onClick={onClick} type="button">
      <Component17 />
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[76px]">住宅</p>
    </button>
  );
}

function Component18() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="工作台 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="å·¥ä½å° 1">
          <path d={svgPaths.pff7200} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame22({ onClick }: { onClick: () => void }) {
  return (
    <button className="bg-transparent border-0 col-1 content-stretch flex items-center ml-[209px] mt-0 p-0 relative row-1" onClick={onClick} type="button">
      <Component18 />
      <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[76px]">公司</p>
    </button>
  );
}

function Frame23({ onQuickSearch }: { onQuickSearch: (query: string) => void }) {
  return (
    <div className="col-1 content-stretch flex font-['PingFang_SC:Regular',sans-serif] gap-[64px] items-start leading-[normal] ml-[40px] mt-[83px] not-italic relative row-1 text-[24px] text-center text-white w-[303px]">
      <button className="bg-transparent border-0 p-0 relative shrink-0 whitespace-nowrap" onClick={() => onQuickSearch("附近停车场")} type="button">最近</button>
      <button className="bg-transparent border-0 h-[31px] p-0 relative shrink-0 w-[81px]" onClick={() => onQuickSearch("成都写字楼")} type="button">收藏夹</button>
      <button className="bg-transparent border-0 p-0 relative shrink-0 whitespace-nowrap" onClick={() => onQuickSearch("附近充电站")} type="button">充电</button>
    </div>
  );
}

function Group2({ onQuickSearch, recentSearches }: { onQuickSearch: (query: string) => void; recentSearches: string[] }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] col-1 h-[445px] ml-0 mt-0 rounded-[12px] row-1 w-[371px]" />
      {recentSearches.length === 0 ? (
        <p className="col-1 font-['PingFang_SC:Regular',sans-serif] leading-[normal] ml-[36px] mt-[133px] not-italic relative row-1 text-[20px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">暂无最近搜索记录</p>
      ) : (
        <div className="col-1 content-stretch flex flex-col gap-[14px] items-start ml-[36px] mt-[118px] relative row-1 w-[299px]">
          {recentSearches.map((item) => (
            <button
              key={item}
              className="bg-transparent border-0 font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic p-0 text-[20px] text-[rgba(255,255,255,0.72)] text-left w-full"
              onClick={() => onQuickSearch(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <Frame21 onClick={() => onQuickSearch("附近住宅小区")} />
      <Frame22 onClick={() => onQuickSearch("成都高新区写字楼")} />
      <Frame23 onQuickSearch={onQuickSearch} />
      <div className="col-1 h-0 ml-[21.5px] mt-[72px] relative row-1 w-[326px]">
        <div className="absolute inset-[-0.5px_-0.15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 327 1">
            <path d="M0.5 0.5H326.5" id="Vector 155" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeOpacity="0.25" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component20() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="推出登陆 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="æ¨åºç»é 1">
          <g id="Vector">
            <path d={svgPaths.p3c9efd00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p10c93d00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component21() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="路线">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="è·¯çº¿">
          <path d={svgPaths.p44fe000} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #0E1131)" />
        </g>
      </svg>
    </div>
  );
}

function Component3D() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="3D 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="3D 1">
          <path d={svgPaths.p3d484d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component22() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="设置 2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="è®¾ç½® 2">
          <path d={svgPaths.p379a5700} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.3" />
        </g>
      </svg>
    </div>
  );
}

function Component19() {
  return (
    <div className="backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] h-[85px] relative rounded-[12px] shrink-0 w-full" data-name="功能框">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] py-[5px] relative size-full">
          <Component20 />
          <Component21 />
          <Component3D />
          <Component22 />
        </div>
      </div>
    </div>
  );
}

function Frame24({
  onQuickSearch,
  onSearchSubmit,
  onSearchValueChange,
  recentSearches,
  searchValue,
}: {
  onQuickSearch: (query: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSearchValueChange: (value: string) => void;
  recentSearches: string[];
  searchValue: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[19px] items-center relative shrink-0 w-[371px]">
      <Component16 onSearchSubmit={onSearchSubmit} onSearchValueChange={onSearchValueChange} searchValue={searchValue} />
      <Group2 onQuickSearch={onQuickSearch} recentSearches={recentSearches} />
      <Component19 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[80px]">
      <p className="leading-[0] relative shrink-0 text-[0px] w-full">
        <span className="leading-[normal] text-[30px]">1.7</span>
        <span className="leading-[normal] text-[20px]">km</span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px] w-full">行程距离</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[81px]">
      <p className="leading-[0] relative shrink-0 text-[0px] w-full">
        <span className="leading-[normal] text-[30px]">0</span>
        <span className="leading-[normal] text-[20px]">h</span>
        <span className="leading-[normal] text-[30px]">3</span>
        <span className="leading-[normal] text-[20px]">min</span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px] w-full">预计时间</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-[99px]">
      <p className="leading-[0] min-w-full relative shrink-0 text-[0px] w-[min-content]">
        <span className="leading-[normal] text-[30px]">0.24</span>
        <span className="leading-[normal] text-[20px]">kwh</span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap">耗电量</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex font-['PingFang_SC:Regular',sans-serif] gap-[59px] items-center not-italic relative shrink-0 text-center text-white">
      <Frame8 />
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Component23() {
  return (
    <div className="backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] content-stretch flex flex-col h-[148px] items-center justify-center py-[26px] relative rounded-[24px] shrink-0 w-[489px]" data-name="右下-速度">
      <Frame11 />
    </div>
  );
}

function Component25() {
  return (
    <div className="relative rounded-[32px] shrink-0 size-[115px]" data-name="专辑封面">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full" src={img1} />
    </div>
  );
}

function Component26() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center leading-[normal] not-italic overflow-clip relative shrink-0 text-white w-full whitespace-nowrap" data-name="音乐简介">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal relative shrink-0 text-[28px]">抬头看看好吗</p>
      <p className="font-['Inter:Light','Noto_Sans_JP:Light',sans-serif] font-light relative shrink-0 text-[20px]">杜宣达</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="gap-x-[11px] gap-y-[11px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] relative shrink-0 w-full" data-name="icon">
      <div className="col-1 content-stretch flex flex-col items-center justify-center overflow-clip px-[7px] py-[9px] relative row-1 shrink-0 size-[72px]" data-name="喜欢/Variant3">
        <div className="h-[30px] relative shrink-0 w-[33px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 30">
            <path d={svgPaths.p27b7ab00} fill="var(--fill-0, #F9686B)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="col-2 content-stretch flex items-center justify-center overflow-clip px-[6px] py-[18px] relative row-1 shrink-0 size-[72px]" data-name="上一首">
        <div className="h-[32px] relative shrink-0 w-[28px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 32">
            <path d={svgPaths.pf5bf330} fill="var(--fill-0, white)" fillOpacity="0.85098" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="col-3 content-stretch flex items-center justify-center overflow-clip p-[9px] relative row-1 shrink-0 size-[72px]" data-name="播放暂停">
        <div className="relative shrink-0 size-[45px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
            <path d={svgPaths.p34f48580} fill="var(--fill-0, white)" fillOpacity="0.85098" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="col-4 content-stretch flex items-center justify-center px-[17px] py-[14px] relative row-1 shrink-0 size-[72px]" data-name="下一首">
        <div className="h-[32px] relative shrink-0 w-[28px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 32">
            <path d={svgPaths.p30827e40} fill="var(--fill-0, white)" fillOpacity="0.85098" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-[318px]">
      <Component26 />
      <Icon />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[454px]">
      <Component25 />
      <Frame12 />
    </div>
  );
}

function Component24() {
  return (
    <div className="backdrop-blur-[25px] content-stretch flex flex-col gap-[10px] h-[148px] items-center justify-center px-[17px] py-[9px] relative shrink-0 w-[493px]" data-name="中下-音乐播放">
      <div className="absolute bg-[rgba(35,35,35,0.5)] h-[148px] left-0 rounded-[24px] top-0 w-[493px]" />
      <Frame13 />
    </div>
  );
}

function Frame16({
  onQuickSearch,
  onSearchSubmit,
  onSearchValueChange,
  recentSearches,
  searchValue,
}: {
  onQuickSearch: (query: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSearchValueChange: (value: string) => void;
  recentSearches: string[];
  searchValue: string;
}) {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-[1411px]">
      <Frame24
        onQuickSearch={onQuickSearch}
        onSearchSubmit={onSearchSubmit}
        onSearchValueChange={onSearchValueChange}
        recentSearches={recentSearches}
        searchValue={searchValue}
      />
      <Component23 />
      <Component24 />
    </div>
  );
}

function Frame17({
  mapUrl,
  onNavigate,
  onQuickSearch,
  onSearchSubmit,
  onSearchValueChange,
  recentSearches,
  searchValue,
}: {
  mapUrl: string;
  onNavigate?: (page: string) => void;
  onQuickSearch: (query: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSearchValueChange: (value: string) => void;
  recentSearches: string[];
  searchValue: string;
}) {
  return (
    <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
      <PageSidebar activePage="nav" dataName="sider-bar" />
      <div className="content-stretch flex h-[652px] items-end justify-between relative rounded-[32px] shrink-0 w-[1778px]">
        <Frame14 onNavigate={onNavigate} />
        <div className="h-full relative shrink-0 w-[1411px]">
          <MapPanel mapUrl={mapUrl} />
          <div className="absolute bottom-0 left-0">
            <Frame16
              onQuickSearch={onQuickSearch}
              onSearchSubmit={onSearchSubmit}
              onSearchValueChange={onSearchValueChange}
              recentSearches={recentSearches}
              searchValue={searchValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Component({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const defaultQuery = "成都 天府广场";
  const [searchValue, setSearchValue] = useState(defaultQuery);
  const [activeQuery, setActiveQuery] = useState(defaultQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    defaultQuery,
    "成都东站",
    "天府国际机场",
  ]);

  const mapUrl = useMemo(() => createBaiduMapUrl(activeQuery), [activeQuery]);

  const applySearch = (query: string) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    setSearchValue(normalizedQuery);
    setActiveQuery(normalizedQuery);
    setRecentSearches((prev) => [normalizedQuery, ...prev.filter((item) => item !== normalizedQuery)].slice(0, 5));
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applySearch(searchValue);
  };

  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="导航页面高保真">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[207.34%] left-[-2.39%] max-w-none top-[-56.6%] w-[103.26%]" src={img} />
      </div>
      <Frame15 />
      <Frame17
        mapUrl={mapUrl}
        onNavigate={onNavigate}
        onQuickSearch={applySearch}
        onSearchSubmit={handleSearchSubmit}
        onSearchValueChange={setSearchValue}
        recentSearches={recentSearches}
        searchValue={searchValue}
      />
    </div>
  );
}
