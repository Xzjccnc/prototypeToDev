import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import homeIcons from "@/icons/homeIcons";
import bgImg from "figma:asset/51f4b2dc353102219050504782ad446e7199fcb1.png";
import albumImg from "figma:asset/db85ce748e0e50fb1dd3b019004adb2ab53b0657.png";
import { StatusBar } from "@/components/common/StatusBar";
import { GestureWindow } from "@/components/common/GestureWindow";
import { PageSidebar } from "@/components/common/PageSidebar";

/* ── Speed Card ── */
function SpeedCard() {
  const [speed, setSpeed] = useState(1.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const delta = (Math.random() - 0.5) * 4;
        return parseFloat(Math.max(0, Math.min(120, prev + delta)).toFixed(1));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backdrop-blur-[25px] bg-gradient-to-b content-stretch flex font-['PingFang_SC:Regular',sans-serif] from-[rgba(34,50,75,0.3)] h-[148px] items-center justify-between not-italic px-[48px] py-[12px] relative rounded-[24px] shrink-0 text-center text-white to-[48.558%] to-[rgba(59,62,78,0.3)] w-[360px] whitespace-nowrap">
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
      <div className="backdrop-blur-[25px] relative shrink-0 w-full rounded-t-[24px]">
        <div className="flex flex-row items-center size-full rounded-t-[24px] overflow-hidden">
          <div className="content-stretch flex items-center px-[24px] py-[6px] relative w-full">
            <div className="content-stretch flex flex-[1_0_0] h-[72px] items-center justify-between min-h-px min-w-px relative">
              <div className="content-stretch flex items-center justify-center relative shrink-0">
                <div className="relative shrink-0 size-[72px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
                    <mask fill="white" id="searchmask">
                      <path d={homeIcons.p2096c180} />
                    </mask>
                    <path d={homeIcons.p2096c180} fill="white" />
                    <path d={homeIcons.p29600a00} fill="black" mask="url(#searchmask)" />
                  </svg>
                </div>
                <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.75)] text-center whitespace-nowrap">搜索</p>
              </div>
              <div className="relative shrink-0 size-[72px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
                  <path d={homeIcons.p10775f00} stroke="white" strokeLinecap="round" strokeOpacity="0.75" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 524 1">
            <path d="M4 0.5H520" stroke="#FDFDFD" strokeOpacity="0.121569" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[61px] items-center justify-center px-[24px] relative w-full">
            {[
              { icon: homeIcons.p32a092f0, label: "住宅" },
              { icon: homeIcons.p3b34c100, label: "公司" },
              { icon: homeIcons.p3b34c100, label: "常用" },
            ].map(({ icon, label }) => (
              <div key={label} className="content-stretch flex gap-[12px] items-center justify-center min-h-[64px] relative shrink-0">
                <div className="relative shrink-0 size-[48px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                    <path d={icon} fill="white" />
                  </svg>
                </div>
                <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">{label}</p>
              </div>
            ))}
          </div>
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
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[48px] relative w-full">
                <div className="content-stretch flex flex-col font-['PingFang_SC:Bold',sans-serif] gap-[24px] items-start not-italic relative shrink-0 text-center text-white tracking-[2px] w-[140px]">
                  <div className="flex flex-col justify-end leading-[0] min-w-full relative shrink-0 text-[64px] w-[min-content]">
                    <p className="leading-none">34℃</p>
                  </div>
                  <p className="leading-none relative shrink-0 text-[24px] whitespace-nowrap">晴间多云</p>
                </div>
                <div className="h-[156.568px] relative shrink-0 w-[233.755px]">
                  <div className="absolute inset-[0_-1.71%_-5.11%_-1.71%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 241.755 164.568">
                      <path clipRule="evenodd" d={homeIcons.pe043580} fill="#FFBB00" fillOpacity="0.86" fillRule="evenodd" />
                      <g filter="url(#cloudf)">
                        <path clipRule="evenodd" d={homeIcons.p33185380} fill="url(#cloudg)" fillRule="evenodd" />
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
          <div className="bg-[rgba(255,255,255,0.25)] relative rounded-[32px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[36px] py-[23px] relative w-full">
                <div className="content-stretch flex gap-[18px] items-center min-w-[200px] relative shrink-0">
                  <div className="relative shrink-0 size-[48px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                      <path d={homeIcons.p15dd4900} fill="white" />
                    </svg>
                  </div>
                  <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-none min-h-px min-w-px not-italic relative text-[24px] text-center text-white tracking-[2px]">28km/h</p>
                </div>
                <div className="content-stretch flex gap-[18px] items-center min-w-[200px] relative shrink-0">
                  <div className="relative shrink-0 size-[48px]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                      <path d={homeIcons.p28391980} fill="white" />
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
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[24px] relative w-full">
                <div className="relative rounded-[32px] shrink-0 size-[160px]">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full" src={albumImg} />
                </div>
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[290px]">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center leading-[normal] not-italic overflow-clip relative shrink-0 text-white whitespace-nowrap">
                      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal relative shrink-0 text-[32px]">抬头看看好吗</p>
                      <p className="font-['Inter:Light','Noto_Sans_JP:Light',sans-serif] font-light relative shrink-0 text-[20px] text-center">杜宣达</p>
                    </div>
                    <div
                      className="overflow-clip relative shrink-0 size-[48px] cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
                    >
                      <div className="absolute inset-[12.5%_8.33%]">
                        <svg className="absolute block size-full" fill={isFavorite ? "#ff3b30" : "none"} preserveAspectRatio="none" viewBox="0 0 39.9994 36.0019">
                          <path d={homeIcons.p32b81f0} stroke={isFavorite ? "#ff3b30" : "white"} />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 w-full">
                    <div className="content-stretch flex items-center justify-between px-[12px] relative w-full">
                      <div className="overflow-clip relative shrink-0 size-[72px]">
                        <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2135 43.2096">
                            <path d={homeIcons.p1d2b7b80} fill="white" fillOpacity="0.85098" />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="relative shrink-0 size-[72px] cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                      >
                        <div className="absolute inset-[12.5%]">
                          {isPlaying ? (
                            <svg className="absolute block size-full" fill="white" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 54">
                              <path d={homeIcons.peda9000} fill="white" fillOpacity="0.85098" />
                              <path d={homeIcons.p1a0f6900} fill="white" fillOpacity="0.85098" />
                              <path d={homeIcons.p195c6000} fill="white" fillOpacity="0.85098" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="relative shrink-0 size-[72px]">
                        <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2137 43.2096">
                            <path d={homeIcons.p3cee5200} fill="white" fillOpacity="0.85098" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[30px] relative shrink-0 w-full">
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
  );
}

/* ── Main Content Area ── */
function MainContent() {
  const navigate = useNavigate();

  return (
    <div className="content-stretch flex h-full items-end justify-between relative rounded-[32px] shrink-0 w-[1778px]">
      <GestureWindow
        onGestureDetected={(gesture) => {
          if (gesture === "Swipe_Up" || gesture === "Swipe_Down" || gesture === "Victory" || gesture === "ILoveYou") {
            navigate("/music");
          } else if (gesture === "Pointing_Up") {
            navigate("/nav");
          }
        }}
      />
      {/* Center: Speed + Search */}
      <div className="flex-[1_0_0] min-h-px min-w-px relative">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[18px] items-center justify-center px-[18px] relative w-full">
            <SpeedCard />
            <SearchAndNav />
          </div>
        </div>
      </div>
      {/* Right: Weather + Music */}
      <div className="content-stretch flex flex-col gap-[24px] h-full items-start relative shrink-0 w-[540px]">
        <div className="flex-[1_1_0] min-h-0 w-full">
          <WeatherCard />
        </div>
        <div
          className="cursor-pointer flex-[1_1_0] min-h-0 w-full hover:opacity-90 transition-opacity"
          onClick={() => navigate("/music")}
        >
          <MiniMusicPlayer />
        </div>
      </div>
    </div>
  );
}

/* ── Page Root ── */
export function HomePage() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="主页">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={bgImg} />
      <StatusBar />
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
            <PageSidebar activePage="home" />
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
}
