import { useState, useRef, useMemo } from "react";
import svgPaths from "./svg-d2ptzwqpoz";
import img20091375005131120641 from "figma:asset/9a7a4c29b4df435e255a166237e3d537fbe93e3c.png";
import img from "figma:asset/c0ae25775c422c652a982fbf7231ff7c5b21c874.png";
import { PageSidebar } from "../app/components/PageSidebar";
import { useGestureRecognition } from "../app/hooks/useGestureRecognition";

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

function Group4() {
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
      <Group4 />
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

function Component6() {
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

function Component7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="主页文字">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">主页</p>
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="主页">
      <Component6 />
      <Component7 />
    </div>
  );
}

function Component9() {
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

function Component10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="车况">
      <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">导航</p>
    </div>
  );
}

function Component8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0" data-name="车况">
      <Component9 />
      <Component10 />
    </div>
  );
}

function Component12() {
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

function Component11() {
  return (
    <div className="bg-[#5849ff] content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0" data-name="设备">
      <Component12 />
      <Frame1 />
    </div>
  );
}

function Component14() {
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

function Component15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="音乐">
      <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">
        <p className="leading-none">音乐</p>
      </div>
    </div>
  );
}

function Component13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[24px] shrink-0" data-name="音乐">
      <Component14 />
      <Component15 />
    </div>
  );
}

function DeviceGestureWindow({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGestureRecognition(videoRef, (gesture) => {
    if (gesture === "Closed_Fist") setCurrentIndex(0);
    else if (gesture === "Open_Palm") setCurrentIndex(1);
    else if (gesture === "Swipe_Up" || gesture === "Swipe_Down") {
      setCurrentIndex(1);
      onNavigate?.("music");
    }
    else if (gesture === "Pointing_Up") {
      setCurrentIndex(2);
      onNavigate?.("home");
    }
    else if (gesture === "Victory" || gesture === "ILoveYou") {
      setCurrentIndex(3);
      onNavigate?.("nav");
    }
    else if (gesture === "Thumb_Up" || gesture === "Thumb_Down") setCurrentIndex(4);
  }, 1000);

  useMemo(() => {
    let stream: MediaStream | null = null;
    async function setupCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
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
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="content-stretch flex flex-col gap-[34px] h-[541px] items-center justify-end overflow-clip px-px relative rounded-[12px] shrink-0" data-name="设备控制">
      <div className="bg-[rgba(35,35,35,0.5)] h-[167px] relative overflow-hidden mix-blend-multiply rounded-[24px] shrink-0 w-[300px]">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
      <div className="bg-[rgba(35,35,35,0.5)] content-stretch flex flex-col h-[295px] items-center justify-center min-w-[300px] overflow-clip p-[12px] relative rounded-[24px] shrink-0 w-[300px]" data-name="手势窗">
        <div className="h-[263px] overflow-clip relative rounded-[32px] shrink-0 w-full" data-name="手势">
          <div aria-hidden="true" className="absolute bg-[rgba(64,136,163,0.19)] inset-0 mix-blend-multiply pointer-events-none rounded-[32px]" />
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[152px] left-[calc(50%+1px)] top-[calc(50%+1px)] w-[130px] flex items-center justify-center">
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
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 130 153">
                <path d="M57.6,151 C28,151 7.2,122.8 7.2,95 C7.2,75 14,60 21,48" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M21,48 C28,32 35,28 42,32 C48,36 48,45 45,55 L40,65" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M40,65 L48,35 C52,20 60,18 65,22 C72,28 68,40 62,55" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M62,55 L70,25 C75,10 82,8 88,15 C95,22 88,38 82,55" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M82,55 L90,35 C95,22 102,20 108,25 C115,32 105,50 95,70 C85,90 95,110 115,120" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M115,120 C125,125 125,140 115,145 C100,150 75,151 57.6,151 Z" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {currentIndex === 2 && (
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path d="M45,20 C45,10 55,10 55,20 L55,45 C65,45 70,50 70,60 C70,75 60,85 50,85 C40,85 30,75 30,60 C30,50 35,45 45,45 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinejoin="round" />
                <path d="M45,45 L35,45 C30,45 25,50 25,55" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M55,45 L65,45 C70,45 75,50 75,55" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M50,85 L50,95" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {currentIndex === 3 && (
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
                <path d="M35,20 C35,10 45,10 45,20 L45,45 L55,45 L55,20 C55,10 65,10 65,20 L65,50 C75,50 80,60 80,70 C80,85 65,95 50,95 C35,95 20,85 20,70 C20,60 25,50 35,50 Z" fill="#262626" stroke="#D9D9D9" strokeWidth="3" strokeLinejoin="round" />
                <path d="M45,45 L45,60" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M55,45 L55,60" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
                <path d="M20,70 C15,60 20,45 28,35" fill="none" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
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

function Group5() {
  return (
    <div className="absolute contents left-[92px] top-[376.5px]">
      <div className="absolute bg-white h-[8px] left-[92px] rounded-[26px] top-[376.5px] w-[236px]" />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute left-[77px] size-[30px] top-[365.5px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Group 1358">
          <g id="Rectangle 3048">
            <path d={svgPaths.p3156a470} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3156a470} fill="var(--fill-1, #3C34D9)" />
          </g>
          <circle cx="15" cy="15" fill="var(--fill-0, white)" id="Ellipse 812" r="5" />
        </g>
      </svg>
    </div>
  );
}

function Component23({ sliderValue, setSliderValue }: { sliderValue: number, setSliderValue: (val: number) => void }) {
  return (
    <div className="absolute contents left-[77px] top-[365.5px]" data-name="座椅调节1">
      <div className="absolute left-[92px] top-[376.5px]">
        <div className="absolute bg-white h-[8px] rounded-[26px] w-[236px]" />
      </div>
      <div 
        className="absolute size-[30px] top-[365.5px] cursor-grab active:cursor-grabbing" 
        style={{ left: `${77 + (sliderValue / 100) * 236}px` }}
        onPointerDown={(e) => {
          const startX = e.clientX;
          const startVal = sliderValue;
          const onMove = (moveEvent: PointerEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newVal = Math.max(0, Math.min(100, startVal + (deltaX / 236) * 100));
            setSliderValue(newVal);
          };
          const onUp = () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
          };
          window.addEventListener("pointermove", onMove);
          window.addEventListener("pointerup", onUp);
        }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
          <g id="Group 1358">
            <g id="Rectangle 3048">
              <path d={svgPaths.p3156a470} fill="var(--fill-0, black)" />
              <path d={svgPaths.p3156a470} fill="var(--fill-1, #3C34D9)" />
            </g>
            <circle cx="15" cy="15" fill="var(--fill-0, white)" id="Ellipse 812" r="5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component24() {
  return (
    <div className="absolute left-[137.65px] size-[314.706px] top-[41.15px]" data-name="座椅调节2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314.706 314.706">
        <g id="åº§æ¤è°è2">
          <path d={svgPaths.p10bb9780} fill="var(--fill-0, white)" id="Ellipse 813" />
          <g id="Group 1358">
            <g id="Rectangle 3048">
              <path d={svgPaths.pc632000} fill="var(--fill-0, black)" />
              <path d={svgPaths.pc632000} fill="var(--fill-1, #3C34D9)" />
            </g>
            <circle cx="239.353" cy="276.352" fill="var(--fill-0, white)" id="Ellipse 812" r="5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component22({ sliderValue, setSliderValue }: { sliderValue: number, setSliderValue: (val: number) => void }) {
  return (
    <div className="h-[453px] overflow-clip relative shrink-0 w-[477px]" data-name="座椅">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[269px] left-[calc(50%-28.5px)] top-[calc(50%-28.5px)] w-[294px]" data-name="座椅">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[137.43%] left-[-14.1%] max-w-none top-[-12%] w-[125.59%]" src={img} />
        </div>
      </div>
      <Component23 sliderValue={sliderValue} setSliderValue={setSliderValue} />
      <Component24 />
    </div>
  );
}

function Component21({ sliderValue, setSliderValue }: { sliderValue: number, setSliderValue: (val: number) => void }) {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[570px]" data-name="座椅">
      <Component22 sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </div>
  );
}

function Component20({ sliderValue, setSliderValue }: { sliderValue: number, setSliderValue: (val: number) => void }) {
  return (
    <div className="bg-[rgba(35,35,35,0.5)] content-stretch flex h-[476px] items-center justify-center overflow-clip px-[8px] relative rounded-[24px] shrink-0 w-[669px]" data-name="座椅">
      <Component21 sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </div>
  );
}

function Frame6({ sliderValue, setSliderValue, onNavigate }: { sliderValue: number, setSliderValue: (val: number) => void, onNavigate?: (page: string) => void }) {
  return (
    <div className="content-stretch flex h-[535px] items-end justify-between overflow-clip relative shrink-0 w-[1694px]">
      <DeviceGestureWindow onNavigate={onNavigate} />
      <Component20 sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </div>
  );
}

function Frame8() {
  return <div className="absolute h-[46px] left-[168px] top-[155px] w-[49px]" />;
}

function Component28() {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[60px]" data-name="空调">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ç©ºè°">
          <path d={svgPaths.p15d7a400} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component27() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="空调">
      <Component28 />
    </div>
  );
}

function Component26() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[72px]" data-name="制冷">
      <Component27 />
    </div>
  );
}

function Component29() {
  return (
    <div className="h-[72px] relative rounded-[45px] shrink-0 w-[91px]" data-name="温度">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[46px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[36px] text-center text-white top-[calc(50%-23.5px)] w-[79px]">26°</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#0c0c0c] content-stretch flex gap-[28px] items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0">
      <Component26 />
      <Component29 />
    </div>
  );
}

function Component30() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="风力">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="é£å">
          <path d={svgPaths.p37a29d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-[42px] overflow-clip relative shrink-0 w-[34px]">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%+0.5px)] not-italic text-[36px] text-center text-white top-[calc(50%-22px)] whitespace-nowrap">1</p>
    </div>
  );
}

function Component31() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="风力">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <g id="é£å">
          <path d={svgPaths.p13139d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[48.551px] relative shrink-0 w-[50.492px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.4923 48.5507">
        <g id="Group 9">
          <path d={svgPaths.p23daeb80} fill="var(--fill-0, white)" id="Union" />
          <path d={svgPaths.p26f45880} fill="var(--fill-0, white)" id="Union_2" />
        </g>
      </svg>
    </div>
  );
}

function Air2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[72px]" data-name="air 3" style={{ backgroundImage: "linear-gradient(90deg, rgb(60, 52, 217) 0%, rgb(60, 52, 217) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)" }}>
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[48.641px] relative shrink-0 w-[48.552px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.5518 48.6415">
        <g id="Group 9">
          <path d={svgPaths.p3aa69680} fill="var(--fill-0, white)" id="Union" />
          <path d={svgPaths.p20e38d80} fill="var(--fill-0, white)" id="Union_2" />
        </g>
      </svg>
    </div>
  );
}

function Air1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center p-[9px] relative rounded-[13px] shrink-0 size-[72px]" data-name="air 2">
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="relative shrink-0 size-[50px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.9999 50">
        <g id="Group 9">
          <path clipRule="evenodd" d={svgPaths.p305dcf00} fill="var(--fill-0, white)" fillRule="evenodd" id="Union" />
          <path clipRule="evenodd" d={svgPaths.pf502300} fill="var(--fill-0, white)" fillRule="evenodd" id="Union_2" />
          <path clipRule="evenodd" d={svgPaths.p17af7c70} fill="var(--fill-0, white)" fillRule="evenodd" id="Union_3" />
        </g>
      </svg>
    </div>
  );
}

function Air() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center overflow-clip px-[8px] py-[9px] relative rounded-[13px] shrink-0 size-[72px]" data-name="air 1">
      <Group3 />
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[50px]">
      <div className="absolute inset-[0_-1.89%_-2.7%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.9467 51.3965">
          <g id="Group 6">
            <path d={svgPaths.p1611e470} id="seat" stroke="var(--stroke-0, white)" strokeWidth="2.7" />
            <g id="heat">
              <path clipRule="evenodd" d={svgPaths.p1bdb9d00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
              <path clipRule="evenodd" d={svgPaths.p2dbc1980} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
              <path clipRule="evenodd" d={svgPaths.p6d84000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component25() {
  const [isAuto, setIsAuto] = useState(true);
  const [isAc, setIsAc] = useState(true);
  const [isSync, setIsSync] = useState(false);
  const [temp, setTemp] = useState(26);
  const [fanSpeed, setFanSpeed] = useState(1);
  const [airMode, setAirMode] = useState(1); // 0, 1, 2
  const [seatHeat, setSeatHeat] = useState(false);

  return (
    <div className="backdrop-blur-[2px] content-stretch flex gap-[95px] h-[115px] items-center relative rounded-[24px] shrink-0 w-[1692px]" data-name="空调参数">
      <div className="bg-[#0c0c0c] content-stretch flex h-[98px] items-center justify-between overflow-clip relative rounded-[24px] shrink-0 w-[600px]" data-name="Component 5">
        <div className="bg-[rgba(255,255,255,0)] h-[54px] relative rounded-[16px] shrink-0 w-[120px] cursor-pointer hover:bg-white/10 transition-colors" data-name="Component 10" onClick={() => {}}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[42px] top-1/2" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
              <path d={svgPaths.p36e7e5f0} fill="var(--fill-0, white)" fillOpacity="0.85098" id="Vector" />
            </svg>
          </div>
          <Frame8 />
        </div>
        <div className={`content-stretch flex flex-col h-[54px] items-center justify-center px-px relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isAuto ? 'bg-white/20' : 'hover:bg-white/10'}`} data-name="Component 12" onClick={() => setIsAuto(!isAuto)}>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-center text-white tracking-[-1.6px] whitespace-nowrap">
            <p className="leading-[normal]">AUTO</p>
          </div>
        </div>
        <div className={`content-stretch flex flex-col h-[54px] items-center justify-center px-[14px] py-[8px] relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isAc ? 'bg-white/20' : 'hover:bg-white/10'}`} data-name="Component 14" onClick={() => setIsAc(!isAc)}>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">A/C</p>
          </div>
        </div>
        <div className={`content-stretch flex items-center justify-center overflow-clip px-[10px] py-[11px] relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isSync ? 'bg-white/20' : 'hover:bg-white/10'}`} data-name="Component 7" onClick={() => setIsSync(!isSync)}>
          <div className="h-[32px] relative shrink-0 w-[70px]" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 32">
              <g id="Union">
                <mask fill="white" id="path-1-inside-1_1_893">
                  <path clipRule="evenodd" d={svgPaths.p285fc4f0} fillRule="evenodd" />
                </mask>
                <path clipRule="evenodd" d={svgPaths.p285fc4f0} fill="var(--fill-0, white)" fillRule="evenodd" mask="url(#path-1-inside-1_1_893)" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0c0c0c] content-stretch flex gap-[28px] items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0">
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[72px] cursor-pointer hover:bg-white/10 transition-colors" data-name="制冷" onClick={() => setTemp(prev => Math.max(16, prev - 1))}>
          <Component27 />
        </div>
        <div className="h-[72px] relative rounded-[45px] shrink-0 w-[91px]" data-name="温度">
          <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[46px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[36px] text-center text-white top-[calc(50%-23.5px)] w-[79px]">{temp}°</p>
        </div>
      </div>

      <div className="bg-[#0c0c0c] content-stretch flex gap-[28px] h-[98px] items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[255px]" data-name="风力">
        <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setFanSpeed(prev => Math.max(1, prev - 1))}><Component30 /></div>
        <div className="h-[42px] overflow-clip relative shrink-0 w-[34px]">
          <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%+0.5px)] not-italic text-[36px] text-center text-white top-[calc(50%-22px)] whitespace-nowrap">{fanSpeed}</p>
        </div>
        <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setFanSpeed(prev => Math.min(5, prev + 1))}><Component31 /></div>
      </div>
      <div className="bg-[#0c0c0c] content-stretch flex gap-[6px] h-[98px] items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[323px]" data-name="风向">
        <div className="cursor-pointer" onClick={() => setAirMode(0)}>
          {airMode === 0 ? <Air2 /> : <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center p-[9px] relative rounded-[13px] shrink-0 size-[72px] hover:bg-white/10 transition-colors"><Group1 /></div>}
        </div>
        <div className={`cursor-pointer rounded-[13px] transition-colors ${airMode === 1 ? 'bg-white/20' : 'hover:bg-white/10'}`} onClick={() => setAirMode(1)}>
          <Air1 />
        </div>
        <div className={`cursor-pointer rounded-[13px] transition-colors ${airMode === 2 ? 'bg-white/20' : 'hover:bg-white/10'}`} onClick={() => setAirMode(2)}>
          <Air />
        </div>
        <div className={`bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${seatHeat ? 'bg-red-500/30' : 'hover:bg-white/10'}`} data-name="座椅加热" onClick={() => setSeatHeat(!seatHeat)}>
          <Group />
        </div>
      </div>
    </div>
  );
}

function Component16({ sliderValue, setSliderValue, onNavigate }: { sliderValue: number, setSliderValue: (val: number) => void, onNavigate?: (page: string) => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[676px] items-center justify-between min-h-px min-w-px overflow-clip pb-[18px] pt-[8px] relative rounded-[24px]" data-name="设备页">
      <Frame6 sliderValue={sliderValue} setSliderValue={setSliderValue} onNavigate={onNavigate} />
      <Component25 />
    </div>
  );
}

function Frame({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div className="content-stretch flex h-[676px] items-end overflow-clip relative rounded-[32px] shrink-0 w-[1778px]">
      <Component16 sliderValue={sliderValue} setSliderValue={setSliderValue} onNavigate={onNavigate} />
    </div>
  );
}

function Component4({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="h-[676px] relative shrink-0 w-full" data-name="设备">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
          <PageSidebar activePage="device" dataName="sider-bar" onNavigate={onNavigate} />
          <Frame onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function DemoContent({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[1920px]" data-name="设备demo">
      <Component1 />
      <Component4 onNavigate={onNavigate} />
    </div>
  );
}

export default function Component({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="relative size-full" data-name="设备页">
      <div className="absolute inset-0 h-full w-full" data-name="2009137500513112064 1">
        <img alt="" className="absolute inset-0 object-cover pointer-events-none size-full" src={img20091375005131120641} />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 18%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.90) 100%)",
          }}
        />
      </div>
      <DemoContent onNavigate={onNavigate} />
    </div>
  );
}