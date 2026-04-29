import { useState } from "react";
import { useNavigate } from "react-router";
import deviceIcons from "@/icons/deviceIcons";
import bgImg from "figma:asset/9a7a4c29b4df435e255a166237e3d537fbe93e3c.png";
import seatImg from "figma:asset/c0ae25775c422c652a982fbf7231ff7c5b21c874.png";
import { StatusBar } from "@/components/common/StatusBar";
import { GestureWindow } from "@/components/common/GestureWindow";
import { PageSidebar } from "@/components/common/PageSidebar";
import { ClimateBar } from "@/components/common/ClimateBar";

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

/* ── Page Root ── */
export function DevicePage() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div className="relative size-full flex flex-col" data-name="设备页">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute inset-0 object-cover size-full" src={bgImg} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(0,0,0,0) 18%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.45) 43%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.78) 68%, rgba(0,0,0,0.88) 83%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      {/* StatusBar */}
      <div className="relative z-10 shrink-0">
        <StatusBar />
      </div>

      {/* Main content row — matches NavigationPage / MusicPage / HomePage padding */}
      <div className="relative z-10 flex-1 min-h-0 flex gap-[16px] items-stretch pr-[12px] py-[12px]">
        {/* Sidebar */}
        <PageSidebar activePage="device" />

        {/* Right content column */}
        <div className="flex-1 min-w-0 flex flex-col gap-[12px]">
          {/* Top row: GestureWindow + Seat */}
          <div className="flex-1 min-h-0 flex justify-between items-stretch">
            <GestureWindow
              heightClass="h-full"
              hideCamera
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
            {/* Seat panel — fixed 640px, right-aligned */}
            <div className="bg-[rgba(35,35,35,0.5)] flex shrink-0 w-[640px] items-center justify-center overflow-clip px-[8px] relative rounded-[24px]">
              <div className="flex items-center justify-center overflow-clip relative shrink-0 w-[570px]">
                <SeatAdjust sliderValue={sliderValue} onChange={setSliderValue} />
              </div>
            </div>
          </div>

          {/* Bottom: Climate Bar */}
          <ClimateBar />
        </div>
      </div>
    </div>
  );
}
