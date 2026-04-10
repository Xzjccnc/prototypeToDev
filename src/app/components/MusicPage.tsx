import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import svgPaths from "../../imports/svg-lmji27raq";
import imgDemoTest from "figma:asset/51f4b2dc353102219050504782ad446e7199fcb1.png";
import imgAlbum from "figma:asset/db85ce748e0e50fb1dd3b019004adb2ab53b0657.png";
import imgPlaylist from "figma:asset/ecba4fdd42eb946b4dcb76db53a5bb09c4196a85.png";
import { PageSidebar } from "./PageSidebar";
import { useGestureRecognition } from "../hooks/useGestureRecognition";

type Page = "home" | "nav" | "device" | "music";
interface MusicPageProps { onNavigate?: (page: Page) => void; }

type Song = {
  title: string;
  artist: string;
  previewUrl?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

async function resolvePreviewUrl(song: Song) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${song.title} ${song.artist}`)}&entity=song&limit=10&country=CN`;
  const response = await fetch(url);
  const data = await response.json();

  if (!Array.isArray(data.results)) {
    return null;
  }

  const exactMatch = data.results.find((item: { trackName?: string; artistName?: string; previewUrl?: string }) =>
    item.previewUrl &&
    item.trackName === song.title &&
    item.artistName?.includes(song.artist),
  );

  if (exactMatch?.previewUrl) {
    return exactMatch.previewUrl;
  }

  const looseMatch = data.results.find((item: { trackName?: string; artistName?: string; previewUrl?: string }) =>
    item.previewUrl &&
    item.trackName?.includes(song.title) &&
    item.artistName?.includes(song.artist),
  );

  return looseMatch?.previewUrl ?? null;
}

/* ── Status Bar ── */
function StatusBar() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[44px] relative shrink-0 w-full" data-name="状态栏">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[32px] py-[8px] relative size-full">
          <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[32px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.p10af9980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
            <div className="h-[24px] relative shrink-0 w-[26px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
                <path d={svgPaths.p317f9600} fill="white" />
              </svg>
            </div>
            <div className="h-[32px] relative shrink-0 w-[31px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 32">
                <path d={svgPaths.p22c86100} fill="white" />
              </svg>
            </div>
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
function Sidebar() {
  return (
    <div className="content-stretch flex flex-col h-[652px] items-center justify-between min-w-[110px] overflow-clip py-[24px] relative rounded-[36px] shrink-0 w-[110px]" data-name="sider-bar">
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(38,38,38,0.72)] inset-0 mix-blend-multiply pointer-events-none rounded-[36px]" />
      {/* 主页 */}
      <div className="content-stretch flex flex-col gap-[8px] items-center overflow-clip p-[8px] relative rounded-[24px] shrink-0">
        <div className="relative shrink-0 size-[72px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
            <path d={svgPaths.p2ac9c800} fill="white" fillOpacity="0.85098" />
          </svg>
        </div>
        <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">主页</p>
      </div>
      {/* 导航 */}
      <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0">
        <div className="relative shrink-0 size-[72px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
            <path d={svgPaths.p3adeba00} fill="white" fillOpacity="0.85098" />
          </svg>
        </div>
        <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">导航</p>
      </div>
      {/* 设备 */}
      <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0">
        <div className="relative shrink-0 size-[72px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
            <path d={svgPaths.p3da8c300} stroke="white" strokeOpacity="0.85098" strokeWidth="3.2" />
          </svg>
        </div>
        <div className="flex flex-col font-['Inter:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">
          <p className="leading-none">设备</p>
        </div>
      </div>
      {/* 音乐 - active */}
      <div className="bg-[#5849ff] content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[24px] shrink-0">
        <div className="relative shrink-0 size-[72px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
            <path d={svgPaths.pc6ab100} fill="white" fillOpacity="0.85098" />
          </svg>
        </div>
        <div className="flex flex-col font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">
          <p className="leading-none">音乐</p>
        </div>
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
    else if (gesture === "Swipe_Up" || gesture === "Swipe_Down") setCurrentIndex(1); // Keep it on Open_Palm for visual consistency or map to Swipe icon if you prefer
    else if (gesture === "Pointing_Up") setCurrentIndex(2);
    else if (gesture === "Victory" || gesture === "ILoveYou") setCurrentIndex(3);
    else if (gesture === "Thumb_Up" || gesture === "Thumb_Down") setCurrentIndex(4);
    
    // Bubble the gesture up for actual control
    onGestureDetected(gesture);
  }, 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      // We can let the wheel auto-scroll slowly, or disable it when gestures take over
      // For now we keep the ambient scroll but it might look better if it only moves by gestures
      // Let's remove the auto-scroll interval since gestures drive it now
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
            const distance = Math.abs(idx - currentIndex);
            // Show only center and immediate neighbors (or wrap-around if needed, simplified here)
            const isVisible = distance <= 1 || distance === gestures.length - 1;
            
            // Adjust styles based on distance from center
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
      <div className="h-[330px] overflow-clip relative rounded-[24px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
        <div className="absolute left-0 overflow-clip rounded-[32px] size-[276px] top-[33px]">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[152px] left-[calc(50%+1px)] top-[calc(50%+1px)] w-[130px] flex items-center justify-center">
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

/* ── Playlist Song Item ── */
function SongItem({ title, artist, cover, isFavorite, onToggleFavorite }: { title: string; artist: string; cover: string; isFavorite: boolean; onToggleFavorite: () => void }) {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors" data-name="歌曲">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between p-[2px] relative w-full">
          <div className="content-stretch flex gap-[17px] items-center relative shrink-0">
            <div className="relative rounded-[16px] shrink-0 size-[68px]">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={cover} />
            </div>
            <div className="capitalize content-stretch flex flex-col gap-[12px] h-[54px] items-start leading-none not-italic relative shrink-0 text-white w-[200.071px] whitespace-nowrap">
              <p className="font-['PingFang_SC:Regular',sans-serif] relative shrink-0 text-[22px]">{title}</p>
              <p className="font-['PingFang_SC:Light',sans-serif] relative shrink-0 text-[18px]">{artist}</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[48px] cursor-pointer" onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}>
            <div className="absolute inset-[12.5%_8.33%]">
              <svg className="absolute block size-full" fill={isFavorite ? "#ff3b30" : "none"} preserveAspectRatio="none" viewBox="0 0 39.9994 36.0019">
                <path d={svgPaths.p32b81f0} stroke={isFavorite ? "#ff3b30" : "white"} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Playlist Panel ── */
export const SONGS: Song[] = [
  { title: "抬头看看好吗", artist: "杜宣达" },
  { title: "红色高跟鞋", artist: "蔡健雅", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/66/9b/3a/669b3a2e-2383-2961-0630-2195b32b18e3/mzaf_7598843410049087214.plus.aac.p.m4a" },
  { title: "Mojito", artist: "周杰伦", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/70/34/06/703406ba-4a91-449a-9623-c3cff4bfa78d/mzaf_9059234340175361181.plus.aac.p.m4a" },
  { title: "安静", artist: "周杰伦", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0a/47/a8/0a47a841-15f8-3dc8-0403-da7d30e89f67/mzaf_1027002373549116132.plus.aac.p.m4a" },
  { title: "晴天", artist: "周杰伦", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/68/46/5d/68465d87-99db-f0e5-dcdb-5b8e3fe64a49/mzaf_4654864440578879672.plus.aac.p.m4a" },
  { title: "七里香", artist: "周杰伦", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/99/4e/e2/994ee285-7c0d-73ab-85b7-8d3899a17242/mzaf_12441330510018253101.plus.aac.p.m4a" },
  { title: "夜曲", artist: "周杰伦", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cd/80/49/cd8049a8-f655-a320-fe39-399582e94ed4/mzaf_2752455179820135985.plus.aac.p.m4a" },
  { title: "稻香", artist: "周杰伦", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/c3/c4/e0/c3c4e033-2bd0-e0fc-3195-3ec68299f19f/mzaf_9545722078596740089.plus.aac.p.m4a" },
];

function PlaylistPanel({ favorites, onToggleFavorite, onPlay }: { favorites: number[]; onToggleFavorite: (idx: number) => void; onPlay: (idx: number) => void }) {
  return (
    <div className="flex-[1_0_0] h-[652px] max-w-[460px] min-h-px min-w-[390px] relative rounded-[24px] overflow-hidden" data-name="播放列表">
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
      <div className="flex flex-col items-center max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full overflow-y-auto">
        <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[inherit] min-w-[inherit] p-[24px] relative size-full">
          {SONGS.map((song, i) => (
            <div key={i} className="w-full" onClick={() => onPlay(i)}>
              <SongItem title={song.title} artist={song.artist} cover={imgPlaylist} isFavorite={favorites.includes(i)} onToggleFavorite={() => onToggleFavorite(i)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Player Panel ── */
function PlayerPanel({
  currentSongIndex,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
}: {
  currentSongIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (event: MouseEvent<HTMLDivElement>) => void;
}) {
  const currentSong = SONGS[currentSongIndex] || SONGS[0];
  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[652px] items-center justify-between min-h-px min-w-px overflow-clip pb-[24px] pt-[48px] relative rounded-[24px]" data-name="播放界面">
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
      {/* Album art */}
      <div className="relative rounded-[32px] shrink-0 size-[300px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full" src={imgAlbum} />
      </div>
      {/* Song info */}
      <div className="content-stretch flex flex-col gap-[10px] items-center justify-center leading-[normal] not-italic overflow-clip px-[235px] relative shrink-0 text-white whitespace-nowrap">
        <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal relative shrink-0 text-[32px]">{currentSong.title}</p>
        <p className="font-['Inter:Light','Noto_Sans_JP:Light',sans-serif] font-light relative shrink-0 text-[20px] text-center">{currentSong.artist}</p>
      </div>
      {/* Progress bar */}
      <div className="h-[30px] relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[44px] items-center justify-center p-[24px] relative size-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">{formatTime(currentTime)}</p>
            <div className="flex-[1_0_0] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative cursor-pointer" onClick={onSeek}>
              <div className="bg-[rgba(35,35,35,0.5)] col-1 h-[18px] ml-0 mt-0 rounded-[25px] row-1 w-full" />
              <div className="bg-[#3c34d9] col-1 h-[18px] ml-0 mt-0 rounded-[25px] row-1" style={{ width: `${progress}%` }} />
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">{formatTime(duration)}</p>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[82px] items-center justify-center px-[123px] py-[3px] relative w-full">
            {/* Shuffle */}
            <div className="overflow-clip relative shrink-0 size-[72px]">
              <div className="-translate-y-1/2 absolute aspect-[70.87540435791016/60.750579833984375] left-[15.28%] right-[15.28%] top-[calc(50%-0.5px)]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 43">
                  <path d={svgPaths.p2ccf0600} fill="white" />
                </svg>
              </div>
            </div>
            {/* Prev */}
            <div className="overflow-clip relative shrink-0 size-[72px] cursor-pointer" onClick={onPrev}>
              <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2135 43.2096">
                  <path d={svgPaths.p1d2b7b80} fill="white" fillOpacity="0.85098" />
                </svg>
              </div>
            </div>
            {/* Play/Pause */}
            <div className="relative shrink-0 size-[72px] cursor-pointer" onClick={onTogglePlay}>
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
            {/* Next */}
            <div className="relative shrink-0 size-[72px] cursor-pointer" onClick={onNext}>
              <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2137 43.2096">
                  <path d={svgPaths.p3cee5200} fill="white" fillOpacity="0.85098" />
                </svg>
              </div>
            </div>
            {/* Playlist */}
            <div className="overflow-clip relative shrink-0 size-[72px]">
              <div className="-translate-y-1/2 absolute aspect-[50/42] left-[15.28%] right-[15.28%] top-1/2">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 42">
                  <path d={svgPaths.p36d9ba80} fill="white" fillOpacity="0.85098" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page Root ── */
export function MusicPage({ onNavigate }: MusicPageProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [resolvedPreviewUrls, setResolvedPreviewUrls] = useState<Record<number, string | null>>({});

  useEffect(() => {
    const controller = new AbortController();

    SONGS.forEach((song, index) => {
      if (song.previewUrl) {
        setResolvedPreviewUrls((prev) => (prev[index] ? prev : { ...prev, [index]: song.previewUrl! }));
        return;
      }

      resolvePreviewUrl(song)
        .then((previewUrl) => {
          if (controller.signal.aborted) {
            return;
          }

          setResolvedPreviewUrls((prev) => ({ ...prev, [index]: previewUrl }));
        })
        .catch(() => {
          if (controller.signal.aborted) {
            return;
          }

          setResolvedPreviewUrls((prev) => ({ ...prev, [index]: null }));
        });
    });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev === SONGS.length - 1 ? 0 : prev + 1));
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const source = resolvedPreviewUrls[currentSongIndex];

    if (!audio) {
      return;
    }

    if (!source) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
      return;
    }

    audio.src = source;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
  }, [currentSongIndex, resolvedPreviewUrls]);

  useEffect(() => {
    const audio = audioRef.current;
    const source = resolvedPreviewUrls[currentSongIndex];

    if (!audio || !source) {
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    audio.pause();
  }, [currentSongIndex, isPlaying, resolvedPreviewUrls]);

  const handleToggleFavorite = (idx: number) => {
    setFavorites(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const handlePrev = () => {
    setCurrentSongIndex(prev => (prev === 0 ? SONGS.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev === SONGS.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;

    if (!audio || duration <= 0) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const progress = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const nextTime = duration * progress;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="音乐 demo_test">
      <audio ref={audioRef} preload="metadata" className="hidden" />
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDemoTest} />
      <StatusBar />
      {/* Main area */}
      <div className="h-[676px] relative shrink-0 w-full" data-name="音乐demo7">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
            <PageSidebar activePage="music" onNavigate={onNavigate} dataName="sider-bar" />
            {/* Content frame */}
            <div className="content-stretch flex h-full items-end justify-between relative rounded-[32px] shrink-0 w-[1778px]">
              <GestureWindow onGestureDetected={(gesture) => {
                if (gesture === "Closed_Fist") {
                  setIsPlaying(false); // Only pause
                } else if (gesture === "Open_Palm") {
                  setIsPlaying(true);  // Only play
                } else if (gesture === "Thumb_Up") {
                  handleNext();
                } else if (gesture === "Thumb_Down") {
                  handlePrev();
                } else if (gesture === "Swipe_Up" || gesture === "Swipe_Down") {
                  onNavigate?.("nav"); // Swipe up/down switches page
                } else if (gesture === "Victory" || gesture === "ILoveYou") {
                  onNavigate?.("nav"); // Keeping the old page switch as a fallback
                }
              }} />
              <PlayerPanel 
                currentSongIndex={currentSongIndex} 
                isPlaying={isPlaying} 
                currentTime={currentTime}
                duration={duration}
                onTogglePlay={() => setIsPlaying(!isPlaying)} 
                onPrev={handlePrev} 
                onNext={handleNext} 
                onSeek={handleSeek}
              />
              <PlaylistPanel 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite} 
                onPlay={(idx) => { setCurrentSongIndex(idx); setIsPlaying(true); }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
