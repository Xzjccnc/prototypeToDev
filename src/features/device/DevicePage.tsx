import { useState } from "react";
import { useNavigate } from "react-router";
import deviceIcons from "@/icons/deviceIcons";
import bgImg from "figma:asset/9a7a4c29b4df435e255a166237e3d537fbe93e3c.png";
import seatImg from "figma:asset/c0ae25775c422c652a982fbf7231ff7c5b21c874.png";
import { StatusBar } from "@/components/common/StatusBar";
import { GestureWindow } from "@/components/common/GestureWindow";
import { PageSidebar } from "@/components/common/PageSidebar";

/* ── Seat Slider ── */
function SeatSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="absolute contents left-[77px] top-[365.5px]" data-name="座椅调节">
      <div className="absolute left-[92px] top-[376.5px]">
        <div className="absolute bg-white h-[8px] rounded-[26px] w-[236px]" />
      </div>
      <div
        className="absolute size-[30px] top-[365.5px] cursor-grab active:cursor-grabbing"
        style={{ left: `${77 + (value / 100) * 236}px` }}
        onPointerDown={(e) => {
          const startX = e.clientX;
          const startVal = value;
          const onMove = (ev: PointerEvent) => {
            const newVal = Math.max(0, Math.min(100, startVal + ((ev.clientX - startX) / 236) * 100));
            onChange(newVal);
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
          <path d={deviceIcons.p3156a470} fill="black" />
          <path d={deviceIcons.p3156a470} fill="#3C34D9" />
          <circle cx="15" cy="15" fill="white" r="5" />
        </svg>
      </div>
    </div>
  );
}

/* ── Seat Adjust Panel ── */
function SeatAdjust({
  sliderValue,
  onChange,
}: {
  sliderValue: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="h-[453px] overflow-clip relative shrink-0 w-[477px]" data-name="座椅">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[269px] left-[calc(50%-28.5px)] top-[calc(50%-28.5px)] w-[294px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[137.43%] left-[-14.1%] max-w-none top-[-12%] w-[125.59%]" src={seatImg} />
        </div>
      </div>
      <SeatSlider value={sliderValue} onChange={onChange} />
      {/* Circular position indicator */}
      <div className="absolute left-[137.65px] size-[314.706px] top-[41.15px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314.706 314.706">
          <path d={deviceIcons.p10bb9780} fill="white" />
          <path d={deviceIcons.pc632000} fill="black" />
          <path d={deviceIcons.pc632000} fill="#3C34D9" />
          <circle cx="239.353" cy="276.352" fill="white" r="5" />
        </svg>
      </div>
    </div>
  );
}

/* ── Gesture Display Panel ── */
function GestureDisplayPanel() {
  return (
    <div className="bg-[rgba(35,35,35,0.5)] content-stretch flex flex-col h-[295px] items-center justify-between min-w-[300px] overflow-clip p-[12px] relative rounded-[24px] shrink-0 w-[300px]" data-name="手势窗">
      <div className="h-[263px] overflow-clip relative rounded-[32px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute bg-[rgba(64,136,163,0.19)] inset-0 mix-blend-multiply pointer-events-none rounded-[32px]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[150px] left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] w-[129px]">
          <div className="absolute inset-[-0.59%_-0.75%_-1.23%_0.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 129.823 152.739">
              <path d={deviceIcons.pe103c00} fill="#7C90A3" fillOpacity="0.61" style={{ mixBlendMode: "multiply" }} />
              <path d={deviceIcons.pe103c00} stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Climate Control ── */
function ClimateControl() {
  const [isAuto, setIsAuto] = useState(true);
  const [isAc, setIsAc] = useState(true);
  const [isSync, setIsSync] = useState(false);
  const [temp, setTemp] = useState(26);
  const [fanSpeed, setFanSpeed] = useState(1);
  const [airMode, setAirMode] = useState(1);
  const [seatHeat, setSeatHeat] = useState(false);

  return (
    <div className="backdrop-blur-[2px] content-stretch flex gap-[95px] h-[115px] items-center relative rounded-[24px] shrink-0 w-[1692px]" data-name="空调参数">
      {/* Mode Controls: AUTO / A/C / SYNC */}
      <div className="bg-[#0c0c0c] content-stretch flex h-[98px] items-center justify-between overflow-clip relative rounded-[24px] shrink-0 w-[600px]">
        <div className="bg-[rgba(255,255,255,0)] h-[54px] relative rounded-[16px] shrink-0 w-[120px] cursor-pointer hover:bg-white/10 transition-colors">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[42px] top-1/2">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
              <path d={deviceIcons.p36e7e5f0} fill="white" fillOpacity="0.85098" />
            </svg>
          </div>
        </div>
        <div
          className={`content-stretch flex flex-col h-[54px] items-center justify-center px-px relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isAuto ? "bg-white/20" : "hover:bg-white/10"}`}
          onClick={() => setIsAuto(!isAuto)}
        >
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] text-[32px] text-center text-white tracking-[-1.6px] whitespace-nowrap">AUTO</p>
        </div>
        <div
          className={`content-stretch flex flex-col h-[54px] items-center justify-center px-[14px] py-[8px] relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isAc ? "bg-white/20" : "hover:bg-white/10"}`}
          onClick={() => setIsAc(!isAc)}
        >
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] text-[32px] text-center text-white whitespace-nowrap">A/C</p>
        </div>
        <div
          className={`content-stretch flex items-center justify-center overflow-clip px-[10px] py-[11px] relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isSync ? "bg-white/20" : "hover:bg-white/10"}`}
          onClick={() => setIsSync(!isSync)}
        >
          <div className="h-[32px] relative shrink-0 w-[70px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 32">
              <mask fill="white" id="syncMask">
                <path clipRule="evenodd" d={deviceIcons.p285fc4f0} fillRule="evenodd" />
              </mask>
              <path clipRule="evenodd" d={deviceIcons.p285fc4f0} fill="white" fillRule="evenodd" mask="url(#syncMask)" stroke="white" strokeLinecap="round" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Temperature */}
      <div className="bg-[#0c0c0c] content-stretch flex gap-[28px] items-center justify-center overflow-clip p-[12px] relative rounded-[24px] shrink-0">
        <div
          className="content-stretch flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[72px] cursor-pointer hover:bg-white/10 transition-colors"
          onClick={() => setTemp((t) => Math.max(16, t - 1))}
        >
          <div className="relative shrink-0 size-[60px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
              <path d={deviceIcons.p15d7a400} fill="white" />
            </svg>
          </div>
        </div>
        <div className="h-[72px] relative rounded-[45px] shrink-0 w-[91px]">
          <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[46px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[36px] text-center text-white top-[calc(50%-23.5px)] w-[79px]">{temp}°</p>
        </div>
        <div
          className="content-stretch flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[72px] cursor-pointer hover:bg-white/10 transition-colors"
          onClick={() => setTemp((t) => Math.min(32, t + 1))}
        >
          <div className="relative shrink-0 size-[60px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
              <path d={deviceIcons.p15d7a400} fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Fan Speed */}
      <div className="bg-[#0c0c0c] content-stretch flex gap-[28px] h-[98px] items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[255px]">
        <div
          className="cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => setFanSpeed((s) => Math.max(1, s - 1))}
        >
          <div className="relative shrink-0 size-[72px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
              <path d={deviceIcons.p37a29d00} fill="white" />
            </svg>
          </div>
        </div>
        <div className="h-[42px] overflow-clip relative shrink-0 w-[34px]">
          <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%+0.5px)] not-italic text-[36px] text-center text-white top-[calc(50%-22px)] whitespace-nowrap">{fanSpeed}</p>
        </div>
        <div
          className="cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => setFanSpeed((s) => Math.min(5, s + 1))}
        >
          <div className="relative shrink-0 size-[72px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
              <path d={deviceIcons.p13139d00} fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Air Mode + Seat Heat */}
      <div className="bg-[#0c0c0c] content-stretch flex gap-[6px] h-[98px] items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[323px]">
        {/* Air mode 0: face+body */}
        <div
          className={`content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${airMode === 0 ? "bg-[#3c34d9]" : "hover:bg-white/10"}`}
          onClick={() => setAirMode(0)}
          style={airMode === 0 ? { backgroundImage: "linear-gradient(90deg, #3c34d9 0%, #3c34d9 100%)" } : undefined}
        >
          <div className="relative shrink-0" style={{ width: "50.49px", height: "48.55px" }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.4923 48.5507">
              <path d={deviceIcons.p23daeb80} fill="white" />
              <path d={deviceIcons.p26f45880} fill="white" />
            </svg>
          </div>
        </div>
        {/* Air mode 1: body only */}
        <div
          className={`content-stretch flex flex-col items-center justify-center p-[9px] relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${airMode === 1 ? "bg-white/20" : "hover:bg-white/10"}`}
          onClick={() => setAirMode(1)}
        >
          <div className="relative shrink-0" style={{ width: "48.55px", height: "48.64px" }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.5518 48.6415">
              <path d={deviceIcons.p3aa69680} fill="white" />
              <path d={deviceIcons.p20e38d80} fill="white" />
            </svg>
          </div>
        </div>
        {/* Air mode 2: floor */}
        <div
          className={`content-stretch flex flex-col items-center justify-center overflow-clip px-[8px] py-[9px] relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${airMode === 2 ? "bg-white/20" : "hover:bg-white/10"}`}
          onClick={() => setAirMode(2)}
        >
          <div className="relative shrink-0 size-[50px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.9999 50">
              <path clipRule="evenodd" d={deviceIcons.p305dcf00} fill="white" fillRule="evenodd" />
              <path clipRule="evenodd" d={deviceIcons.pf502300} fill="white" fillRule="evenodd" />
              <path clipRule="evenodd" d={deviceIcons.p17af7c70} fill="white" fillRule="evenodd" />
            </svg>
          </div>
        </div>
        {/* Seat heat */}
        <div
          className={`content-stretch flex flex-col items-center justify-center relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${seatHeat ? "bg-red-500/30" : "hover:bg-white/10"}`}
          onClick={() => setSeatHeat(!seatHeat)}
        >
          <div className="relative shrink-0 size-[50px]">
            <div className="absolute inset-[0_-1.89%_-2.7%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.9467 51.3965">
                <path d={deviceIcons.p1611e470} stroke="white" strokeWidth="2.7" />
                <path clipRule="evenodd" d={deviceIcons.p1bdb9d00} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={deviceIcons.p2dbc1980} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={deviceIcons.p6d84000} fill="white" fillRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page Root ── */
export function DevicePage() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div className="relative size-full" data-name="设备页">
      <div className="absolute inset-0 h-full w-full">
        <img alt="" className="absolute inset-0 object-cover pointer-events-none size-full" src={bgImg} />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(0,0,0,0) 18%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.90) 100%)",
          }}
        />
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[1920px]">
        <StatusBar />
        <div className="h-[676px] relative shrink-0 w-full">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
              <PageSidebar activePage="device" />
              <div className="content-stretch flex h-[676px] items-end overflow-clip relative rounded-[32px] shrink-0 w-[1778px]">
                <div className="content-stretch flex flex-[1_0_0] flex-col h-[676px] items-center justify-between min-h-px min-w-px overflow-clip pb-[18px] pt-[8px] relative rounded-[24px]">
                  {/* Top: Gesture + Seat */}
                  <div className="content-stretch flex h-[535px] items-end justify-between overflow-clip relative shrink-0 w-[1694px]">
                    <GestureWindow
                      heightClass="h-[541px]"
                      onGestureDetected={(gesture) => {
                        if (gesture === "Swipe_Up" || gesture === "Swipe_Down") {
                          navigate("/music");
                        } else if (gesture === "Pointing_Up") {
                          navigate("/");
                        } else if (gesture === "Victory" || gesture === "ILoveYou") {
                          navigate("/nav");
                        }
                      }}
                    />
                    {/* Right: Seat */}
                    <div className="bg-[rgba(35,35,35,0.5)] content-stretch flex h-[476px] items-center justify-center overflow-clip px-[8px] relative rounded-[24px] shrink-0 w-[669px]">
                      <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[570px]">
                        <SeatAdjust sliderValue={sliderValue} onChange={setSliderValue} />
                      </div>
                    </div>
                  </div>
                  {/* Bottom: Climate Control */}
                  <ClimateControl />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
