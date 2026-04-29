import { useState } from "react";
import deviceIcons from "@/icons/deviceIcons";

const ACTIVE = "bg-[#5849ff]";
const HOVER = "hover:bg-white/10";

export function ClimateBar() {
  const [isAcIcon, setIsAcIcon] = useState(false);
  const [isAuto, setIsAuto] = useState(true);
  const [isAc, setIsAc] = useState(true);
  const [isSync, setIsSync] = useState(false);
  const [temp, setTemp] = useState(26);
  const [fanSpeed, setFanSpeed] = useState(1);
  const [airMode, setAirMode] = useState(1);
  const [seatHeat, setSeatHeat] = useState(false);

  return (
    <div
      className="flex h-[98px] items-center justify-between relative rounded-[24px] shrink-0 w-full"
      data-name="空调参数"
    >
      {/* Mode Controls: AUTO / A/C / SYNC */}
      <div className="bg-[#0c0c0c] flex h-[98px] items-center justify-between overflow-clip px-[24px] relative rounded-[24px] shrink-0 w-[600px]">
        {/* AC icon */}
        <div
          className={`h-[54px] relative rounded-[16px] shrink-0 w-[120px] cursor-pointer transition-colors ${isAcIcon ? ACTIVE : HOVER}`}
          onClick={() => setIsAcIcon(!isAcIcon)}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[42px] top-1/2">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
              <path d={deviceIcons.p36e7e5f0} fill="white" fillOpacity="0.85098" />
            </svg>
          </div>
        </div>
        {/* AUTO */}
        <div
          className={`flex flex-col h-[54px] items-center justify-center px-px relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isAuto ? ACTIVE : HOVER}`}
          onClick={() => setIsAuto(!isAuto)}
        >
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] text-[32px] text-center text-white tracking-[-1.6px] whitespace-nowrap">AUTO</p>
        </div>
        {/* A/C */}
        <div
          className={`flex flex-col h-[54px] items-center justify-center px-[14px] py-[8px] relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isAc ? ACTIVE : HOVER}`}
          onClick={() => setIsAc(!isAc)}
        >
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] text-[32px] text-center text-white whitespace-nowrap">A/C</p>
        </div>
        {/* SYNC */}
        <div
          className={`flex items-center justify-center overflow-clip px-[10px] py-[11px] relative shrink-0 w-[120px] cursor-pointer rounded-[16px] transition-colors ${isSync ? ACTIVE : HOVER}`}
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
      <div className="bg-[#0c0c0c] flex gap-[28px] items-center justify-center overflow-clip px-[12px] relative rounded-[24px] shrink-0 h-[98px]">
        <div
          className={`flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[72px] cursor-pointer transition-colors ${HOVER}`}
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
          className={`flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[72px] cursor-pointer transition-colors ${HOVER}`}
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
      <div className="bg-[#0c0c0c] flex gap-[28px] h-[98px] items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[255px]">
        <div
          className={`cursor-pointer rounded-[12px] transition-opacity ${HOVER}`}
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
          className={`cursor-pointer rounded-[12px] transition-opacity ${HOVER}`}
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
      <div className="bg-[#0c0c0c] flex gap-[6px] h-[98px] items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[323px]">
        {/* Air mode 0: face+body */}
        <div
          className={`flex flex-col items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${airMode === 0 ? ACTIVE : HOVER}`}
          onClick={() => setAirMode(0)}
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
          className={`flex flex-col items-center justify-center p-[9px] relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${airMode === 1 ? ACTIVE : HOVER}`}
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
          className={`flex flex-col items-center justify-center overflow-clip px-[8px] py-[9px] relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${airMode === 2 ? ACTIVE : HOVER}`}
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
          className={`flex flex-col items-center justify-center relative rounded-[13px] shrink-0 size-[72px] cursor-pointer transition-colors ${seatHeat ? ACTIVE : HOVER}`}
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
