import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router";
import commonIcons from "@/icons/commonIcons";
import bgImg from "figma:asset/51f4b2dc353102219050504782ad446e7199fcb1.png";
import albumImg from "figma:asset/db85ce748e0e50fb1dd3b019004adb2ab53b0657.png";
import playlistImg from "figma:asset/ecba4fdd42eb946b4dcb76db53a5bb09c4196a85.png";
import { StatusBar } from "@/components/common/StatusBar";
import { GestureWindow } from "@/components/common/GestureWindow";
import { PageSidebar } from "@/components/common/PageSidebar";

type Song = {
  title: string;
  artist: string;
  previewUrl?: string;
};

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

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

async function resolvePreviewUrl(song: Song): Promise<string | null> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${song.title} ${song.artist}`)}&entity=song&limit=10&country=CN`;
  const response = await fetch(url);
  const data = await response.json();
  if (!Array.isArray(data.results)) return null;

  type ItunesItem = { trackName?: string; artistName?: string; previewUrl?: string };
  const exact = data.results.find((item: ItunesItem) =>
    item.previewUrl && item.trackName === song.title && item.artistName?.includes(song.artist)
  );
  if (exact?.previewUrl) return exact.previewUrl;

  const loose = data.results.find((item: ItunesItem) =>
    item.previewUrl && item.trackName?.includes(song.title) && item.artistName?.includes(song.artist)
  );
  return loose?.previewUrl ?? null;
}

/* ── Song Item ── */
function SongItem({
  title,
  artist,
  isFavorite,
  onToggleFavorite,
}: {
  title: string;
  artist: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors">
      <div className="content-stretch flex items-center justify-between p-[2px] relative w-full">
        <div className="content-stretch flex gap-[17px] items-center relative shrink-0">
          <div className="relative rounded-[16px] shrink-0 size-[68px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={playlistImg} />
          </div>
          <div className="content-stretch flex flex-col gap-[12px] h-[54px] items-start leading-none not-italic relative shrink-0 text-white w-[200px] whitespace-nowrap">
            <p className="font-['PingFang_SC:Regular',sans-serif] relative shrink-0 text-[22px]">{title}</p>
            <p className="font-['PingFang_SC:Light',sans-serif] relative shrink-0 text-[18px]">{artist}</p>
          </div>
        </div>
        <div
          className="overflow-clip relative shrink-0 size-[48px] cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
        >
          <div className="absolute inset-[12.5%_8.33%]">
            <svg className="absolute block size-full" fill={isFavorite ? "#ff3b30" : "none"} preserveAspectRatio="none" viewBox="0 0 39.9994 36.0019">
              <path d={commonIcons.p32b81f0} stroke={isFavorite ? "#ff3b30" : "white"} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Playlist Panel ── */
function PlaylistPanel({
  favorites,
  onToggleFavorite,
  onPlay,
}: {
  favorites: number[];
  onToggleFavorite: (idx: number) => void;
  onPlay: (idx: number) => void;
}) {
  return (
    <div className="flex-[1_0_0] h-[652px] max-w-[460px] min-h-px min-w-[390px] relative rounded-[24px] overflow-hidden" data-name="播放列表">
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
      <div className="flex flex-col items-center max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full overflow-y-auto">
        <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[inherit] min-w-[inherit] p-[24px] relative size-full">
          {SONGS.map((song, i) => (
            <div key={i} className="w-full" onClick={() => onPlay(i)}>
              <SongItem
                title={song.title}
                artist={song.artist}
                isFavorite={favorites.includes(i)}
                onToggleFavorite={() => onToggleFavorite(i)}
              />
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
  const song = SONGS[currentSongIndex] ?? SONGS[0];
  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[652px] items-center justify-between min-h-px min-w-px overflow-clip pb-[24px] pt-[48px] relative rounded-[24px]" data-name="播放界面">
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] inset-0 mix-blend-multiply pointer-events-none rounded-[24px]" />
      <div className="relative rounded-[32px] shrink-0 size-[300px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full" src={albumImg} />
      </div>
      <div className="content-stretch flex flex-col gap-[10px] items-center justify-center leading-[normal] not-italic overflow-clip px-[235px] relative shrink-0 text-white whitespace-nowrap">
        <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal relative shrink-0 text-[32px]">{song.title}</p>
        <p className="font-['Inter:Light','Noto_Sans_JP:Light',sans-serif] font-light relative shrink-0 text-[20px] text-center">{song.artist}</p>
      </div>
      {/* Progress */}
      <div className="h-[30px] relative shrink-0 w-full">
        <div className="content-stretch flex gap-[44px] items-center justify-center p-[24px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">{formatTime(currentTime)}</p>
          <div className="flex-[1_0_0] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative cursor-pointer" onClick={onSeek}>
            <div className="bg-[rgba(35,35,35,0.5)] col-1 h-[18px] ml-0 mt-0 rounded-[25px] row-1 w-full" />
            <div className="bg-[#3c34d9] col-1 h-[18px] ml-0 mt-0 rounded-[25px] row-1" style={{ width: `${progress}%` }} />
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">{formatTime(duration)}</p>
        </div>
      </div>
      {/* Controls */}
      <div className="content-stretch flex gap-[82px] items-center justify-center px-[123px] py-[3px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[72px]">
          <div className="-translate-y-1/2 absolute aspect-[70.87540435791016/60.750579833984375] left-[15.28%] right-[15.28%] top-[calc(50%-0.5px)]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 43">
              <path d={commonIcons.p2ccf0600} fill="white" />
            </svg>
          </div>
        </div>
        <div className="overflow-clip relative shrink-0 size-[72px] cursor-pointer" onClick={onPrev}>
          <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2135 43.2096">
              <path d={commonIcons.p1d2b7b80} fill="white" fillOpacity="0.85098" />
            </svg>
          </div>
        </div>
        <div className="relative shrink-0 size-[72px] cursor-pointer" onClick={onTogglePlay}>
          <div className="absolute inset-[12.5%]">
            {isPlaying ? (
              <svg className="absolute block size-full" fill="white" preserveAspectRatio="none" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 54">
                <path d={commonIcons.peda9000} fill="white" fillOpacity="0.85098" />
                <path d={commonIcons.p1a0f6900} fill="white" fillOpacity="0.85098" />
                <path d={commonIcons.p195c6000} fill="white" fillOpacity="0.85098" />
              </svg>
            )}
          </div>
        </div>
        <div className="relative shrink-0 size-[72px] cursor-pointer" onClick={onNext}>
          <div className="absolute inset-[19.99%_23.66%_19.99%_23.27%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2137 43.2096">
              <path d={commonIcons.p3cee5200} fill="white" fillOpacity="0.85098" />
            </svg>
          </div>
        </div>
        <div className="overflow-clip relative shrink-0 size-[72px]">
          <div className="-translate-y-1/2 absolute aspect-[50/42] left-[15.28%] right-[15.28%] top-1/2">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 42">
              <path d={commonIcons.p36d9ba80} fill="white" fillOpacity="0.85098" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page Root ── */
export function MusicPage() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [resolvedPreviewUrls, setResolvedPreviewUrls] = useState<Record<number, string | null>>({});

  // Resolve preview URLs for songs without hardcoded ones
  useEffect(() => {
    const controller = new AbortController();
    SONGS.forEach((song, index) => {
      if (song.previewUrl) {
        setResolvedPreviewUrls((prev) => (prev[index] ? prev : { ...prev, [index]: song.previewUrl! }));
        return;
      }
      resolvePreviewUrl(song)
        .then((url) => {
          if (!controller.signal.aborted) {
            setResolvedPreviewUrls((prev) => ({ ...prev, [index]: url }));
          }
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setResolvedPreviewUrls((prev) => ({ ...prev, [index]: null }));
          }
        });
    });
    return () => controller.abort();
  }, []);

  // Bind audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => { setCurrentSongIndex((p) => (p === SONGS.length - 1 ? 0 : p + 1)); setIsPlaying(true); };
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Update audio source when song changes
  useEffect(() => {
    const audio = audioRef.current;
    const source = resolvedPreviewUrls[currentSongIndex];
    if (!audio) return;
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

  // Sync play/pause state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    const source = resolvedPreviewUrls[currentSongIndex];
    if (!audio || !source) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [currentSongIndex, isPlaying, resolvedPreviewUrls]);

  const handlePrev = () => { setCurrentSongIndex((p) => (p === 0 ? SONGS.length - 1 : p - 1)); setIsPlaying(true); };
  const handleNext = () => { setCurrentSongIndex((p) => (p === SONGS.length - 1 ? 0 : p + 1)); setIsPlaying(true); };

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const progress = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const nextTime = duration * progress;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="音乐">
      <audio ref={audioRef} preload="metadata" className="hidden" />
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={bgImg} />
      <StatusBar />
      <div className="h-[676px] relative shrink-0 w-full">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
            <PageSidebar activePage="music" />
            <div className="content-stretch flex h-full items-end justify-between relative rounded-[32px] shrink-0 w-[1778px]">
              <GestureWindow
                onGestureDetected={(gesture) => {
                  if (gesture === "Closed_Fist") setIsPlaying(false);
                  else if (gesture === "Open_Palm") setIsPlaying(true);
                  else if (gesture === "Thumb_Up") handleNext();
                  else if (gesture === "Thumb_Down") handlePrev();
                  else if (gesture === "Swipe_Up" || gesture === "Swipe_Down" || gesture === "Victory" || gesture === "ILoveYou") {
                    navigate("/nav");
                  }
                }}
              />
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
                onToggleFavorite={(idx) => setFavorites((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx])}
                onPlay={(idx) => { setCurrentSongIndex(idx); setIsPlaying(true); }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
