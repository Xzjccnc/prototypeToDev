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
          {isPlaying ? (
            <>
              <div className="absolute inset-[11.11%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
                  <path d="M27.9994 56C12.6024 56 0 43.3999 0 28.0003C0 12.6007 12.6024 0 27.9994 0C43.3964 0 56 12.6001 56 28.0003C56 43.4005 43.4001 56 27.9994 56ZM37.0335 49.4804C42.6301 47.0897 47.0848 42.6338 49.4675 37.0433C50.6799 34.1818 51.3045 31.1067 51.3045 28C51.3045 24.8933 50.6799 21.8182 49.4675 18.9567C47.0852 13.3655 42.6304 8.90891 37.0335 6.51773C34.1766 5.30675 31.1045 4.68263 28.0006 4.68263C24.8967 4.68263 21.8246 5.30675 18.9677 6.51773C13.3699 8.90838 8.91413 13.365 6.53121 18.9567C5.31887 21.8182 4.6942 24.8933 4.6942 28C4.6942 31.1067 5.31887 34.1818 6.53121 37.0433C8.91452 42.6343 13.3702 47.0902 18.9677 49.4804C21.8246 50.6914 24.8967 51.3155 28.0006 51.3155C31.1045 51.3155 34.1766 50.6914 37.0335 49.4804Z" fill="white" />
                </svg>
              </div>
              <div className="absolute inset-[29.17%_36.12%_29.26%_55.56%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99273 29.9363">
                  <path d="M2.99601 0H2.99672C4.99406 0 5.99273 0.998673 5.99273 2.99602V26.9402C5.99273 28.9376 4.99406 29.9363 2.99672 29.9363H2.99601C0.998671 29.9363 0 28.9376 0 26.9402V2.99602C0 0.998673 0.998671 0 2.99601 0Z" fill="white" />
                </svg>
              </div>
              <div className="absolute inset-[29.17%_53.96%_29.26%_37.5%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.14742 29.9363">
                  <path d="M3.07406 0H3.07336C5.12274 0 6.14742 1.02469 6.14742 3.07406V26.8622C6.14742 28.9116 5.12274 29.9363 3.07336 29.9363H3.07406C1.02469 29.9363 0 28.9116 0 26.8622V3.07406C0 1.02469 1.02469 0 3.07406 0Z" fill="white" />
                </svg>
              </div>
            </>
          ) : (
            <div className="absolute inset-[10.49%]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56.8889 56.8889">
                <path d="M28.4444 0C22.8187 1.213e-08 17.3192 1.66824 12.6416 4.79375C7.9639 7.91927 4.31811 12.3617 2.16522 17.5592C0.0123246 22.7568 -0.55097 28.476 0.546565 33.9937C1.6441 39.5114 4.35317 44.5797 8.3312 48.5577C12.3092 52.5357 17.3775 55.2448 22.8952 56.3423C28.4129 57.4399 34.1321 56.8766 39.3297 54.7237C44.5272 52.5708 48.9696 48.925 52.0951 44.2473C55.2207 39.5697 56.8889 34.0702 56.8889 28.4444C56.8889 24.7091 56.1532 21.0103 54.7237 17.5592C53.2942 14.1082 51.199 10.9725 48.5577 8.33118C45.9164 5.68987 42.7807 3.59467 39.3297 2.1652C35.8786 0.735737 32.1798 -8.05402e-09 28.4444 0ZM28.4444 52.3976C23.707 52.3976 19.0758 50.9928 15.1368 48.3608C11.1977 45.7288 8.12753 41.9878 6.31457 37.6109C4.50161 33.2341 4.02725 28.4179 4.95149 23.7714C5.87573 19.1249 8.15706 14.8569 11.507 11.507C14.8569 8.15704 19.1249 5.87572 23.7714 4.95148C28.4179 4.02724 33.2341 4.50159 37.6109 6.31456C41.9878 8.12752 45.7288 11.1977 48.3608 15.1367C50.9928 19.0758 52.3977 23.7069 52.3977 28.4444C52.3977 31.59 51.7781 34.7048 50.5743 37.6109C49.3706 40.5171 47.6062 43.1577 45.3819 45.3819C43.1577 47.6062 40.5171 49.3706 37.6109 50.5743C34.7048 51.7781 31.59 52.3976 28.4444 52.3976ZM38.6695 26.9474L31.2889 22.6358L23.4442 18.0547C23.2124 17.945 22.955 17.9008 22.6999 17.9267C22.4447 17.9526 22.2015 18.0478 21.9965 18.2019C21.7916 18.3561 21.6326 18.5633 21.5368 18.8012C21.441 19.0391 21.4121 19.2986 21.4531 19.5518V37.2472C21.4121 37.5004 21.441 37.76 21.5368 37.9979C21.6326 38.2358 21.7916 38.443 21.9965 38.5971C22.2015 38.7512 22.4447 38.8464 22.6999 38.8724C22.955 38.8983 23.2124 38.854 23.4442 38.7443L31.2889 34.1633L38.6695 29.8667C38.9103 29.7069 39.1079 29.49 39.2446 29.2353C39.3813 28.9806 39.4528 28.6961 39.4528 28.407C39.4528 28.118 39.3813 27.8334 39.2446 27.5787C39.1079 27.324 38.9103 27.1071 38.6695 26.9474Z" fill="white" />
              </svg>
            </div>
          )}
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
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
            <PageSidebar activePage="music" />
            <div className="content-stretch flex h-full items-end gap-[16px] relative rounded-[32px] shrink-0 w-[1778px]">
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
