import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import navigationIcons from "@/icons/navigationIcons";
import bgImg from "figma:asset/b1457bb4909c074b9ca61a20211a75f7d79e1703.png";
import albumImg from "figma:asset/db85ce748e0e50fb1dd3b019004adb2ab53b0657.png";
import { StatusBar } from "@/components/common/StatusBar";
import { GestureWindow } from "@/components/common/GestureWindow";
import { PageSidebar } from "@/components/common/PageSidebar";

function createBaiduMapUrl(query: string): string {
  const q = query.trim();
  if (!q) {
    return "https://api.map.baidu.com/marker?location=104.066541,30.572269&title=%E5%A4%A9%E5%BA%9C%E5%B9%BF%E5%9C%BA&content=%E6%88%90%E9%83%BD%E5%B8%82%E5%A4%A9%E5%BA%9C%E5%B9%BF%E5%9C%BA&output=html&src=prototypeToDev";
  }
  return `https://api.map.baidu.com/place/search?query=${encodeURIComponent(q)}&region=%E5%85%A8%E5%9B%BD&output=html&src=prototypeToDev`;
}

function MapPanel({ mapUrl }: { mapUrl: string }) {
  const queryMatch = mapUrl.match(/query=([^&]+)/) || mapUrl.match(/title=([^&]+)/);
  const query = queryMatch ? decodeURIComponent(queryMatch[1]) : "天府广场";

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; background: #222; }
        .anchorBL, .BMap_cpyCtrl, .BMap_scaleCtrl, .BMap_stdMpCtrl, .BMap_noprint { display: none !important; }
      </style>
      <script src="https://api.map.baidu.com/api?v=3.0&ak=E4805d16520de693a3fe707cdc962045"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        try {
          var map = new BMap.Map("map");
          map.enableScrollWheelZoom(true);
          // 切换为百度地图官方的黑夜模式
          map.setMapStyle({ style: "dark" });

          var local = new BMap.LocalSearch(map, {
            onSearchComplete: function(results) {
              if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                var pt = results.getPoi(0).point;
                map.centerAndZoom(pt, 16);
                map.addOverlay(new BMap.Marker(pt));
              } else {
                map.centerAndZoom(new BMap.Point(104.066541, 30.572269), 16);
              }
            }
          });
          local.search("${query}");
        } catch(e) {}
      </script>
    </body>
    </html>
  `;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-auto" style={{ zIndex: 0 }}>
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(35,35,35,0.35)] inset-0 pointer-events-none rounded-[32px]" />
      <iframe
        className="absolute inset-0 h-full w-full border-0 rounded-[32px]"
        style={{ pointerEvents: "auto" }}
        srcDoc={mapHtml}
        title="百度地图"
      />
    </div>
  );
}

function SearchBox({
  searchValue,
  onSearchValueChange,
  onSearchSubmit,
}: {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      className="backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] content-stretch flex flex-col items-center justify-center py-[6px] relative rounded-[24px] shrink-0 w-full"
      data-name="搜索框"
      onSubmit={onSearchSubmit}
    >
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <div className="relative shrink-0 size-[72px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
              <mask fill="white" id="navSearchMask">
                <path d={navigationIcons.p21963c00} />
              </mask>
              <path d={navigationIcons.p21963c00} fill="white" />
              <path d={navigationIcons.p1a4d1972} fill="black" mask="url(#navSearchMask)" />
            </svg>
          </div>
          <input
            className="bg-transparent border-0 font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic outline-none relative shrink-0 text-[28px] text-[rgba(255,255,255,0.75)] text-center w-[220px]"
            onChange={(e) => onSearchValueChange(e.target.value)}
            placeholder="搜索"
            value={searchValue}
          />
        </div>
        <button className="bg-transparent border-0 p-0" type="submit">
          <div className="relative shrink-0 size-[72px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
              <path d={navigationIcons.p10775f00} stroke="white" strokeLinecap="round" strokeOpacity="0.75" strokeWidth="3" />
            </svg>
          </div>
        </button>
      </div>
    </form>
  );
}

function QuickSearchPanel({
  recentSearches,
  onQuickSearch,
}: {
  recentSearches: string[];
  onQuickSearch: (query: string) => void;
}) {
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
      {/* Quick access buttons */}
      <button
        className="bg-transparent border-0 col-1 content-stretch flex items-center justify-end ml-0 mt-0 p-0 relative row-1"
        onClick={() => onQuickSearch("附近住宅小区")}
        type="button"
      >
        <div className="relative shrink-0 size-[72px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
            <path d={navigationIcons.p2eab2d00} fill="white" />
          </svg>
        </div>
        <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[76px]">住宅</p>
      </button>
      <button
        className="bg-transparent border-0 col-1 content-stretch flex items-center ml-[209px] mt-0 p-0 relative row-1"
        onClick={() => onQuickSearch("成都高新区写字楼")}
        type="button"
      >
        <div className="relative shrink-0 size-[72px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
            <path d={navigationIcons.pff7200} fill="white" />
          </svg>
        </div>
        <p className="font-['PingFang_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[76px]">公司</p>
      </button>
      <div className="col-1 content-stretch flex font-['PingFang_SC:Regular',sans-serif] gap-[64px] items-start leading-[normal] ml-[40px] mt-[83px] not-italic relative row-1 text-[24px] text-center text-white w-[303px]">
        {[
          { label: "最近", query: "附近停车场" },
          { label: "收藏夹", query: "成都写字楼" },
          { label: "充电", query: "附近充电站" },
        ].map(({ label, query }) => (
          <button key={label} className="bg-transparent border-0 p-0 relative shrink-0 whitespace-nowrap" onClick={() => onQuickSearch(query)} type="button">
            {label}
          </button>
        ))}
      </div>
      <div className="col-1 h-0 ml-[21.5px] mt-[72px] relative row-1 w-[326px]">
        <div className="absolute inset-[-0.5px_-0.15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 327 1">
            <path d="M0.5 0.5H326.5" stroke="white" strokeLinecap="round" strokeOpacity="0.25" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MapToolbar() {
  return (
    <div className="backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] h-[85px] relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex items-center justify-between px-[20px] py-[5px] relative size-full">
        {[
          { icon: navigationIcons.p3c9efd00, icon2: navigationIcons.p10c93d00, label: "退出" },
          { icon: navigationIcons.p44fe000, label: "路线" },
          { icon: navigationIcons.p3d484d00, label: "3D" },
          { icon: navigationIcons.p379a5700, label: "设置" },
        ].map(({ icon, icon2, label }) => (
          <div key={label} className="relative shrink-0 size-[72px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
              {icon2
                ? (<><path d={icon} fill="white" /><path d={icon2} fill="white" /></>)
                : (<path d={icon} fill="white" />)
              }
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function TripInfo() {
  return (
    <div className="backdrop-blur-[25px] bg-[rgba(35,35,35,0.5)] content-stretch flex flex-col h-[148px] items-center justify-center py-[26px] relative rounded-[24px] shrink-0 w-[489px]">
      <div className="content-stretch flex font-['PingFang_SC:Regular',sans-serif] gap-[59px] items-center not-italic relative shrink-0 text-center text-white">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[80px]">
          <p className="leading-[0] relative shrink-0 text-[0px] w-full">
            <span className="leading-[normal] text-[30px]">1.7</span>
            <span className="leading-[normal] text-[20px]">km</span>
          </p>
          <p className="leading-[normal] relative shrink-0 text-[20px] w-full">行程距离</p>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[81px]">
          <p className="leading-[0] relative shrink-0 text-[0px] w-full">
            <span className="leading-[normal] text-[30px]">0</span>
            <span className="leading-[normal] text-[20px]">h</span>
            <span className="leading-[normal] text-[30px]">3</span>
            <span className="leading-[normal] text-[20px]">min</span>
          </p>
          <p className="leading-[normal] relative shrink-0 text-[20px] w-full">预计时间</p>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-[99px]">
          <p className="leading-[0] min-w-full relative shrink-0 text-[0px] w-[min-content]">
            <span className="leading-[normal] text-[30px]">0.24</span>
            <span className="leading-[normal] text-[20px]">kwh</span>
          </p>
          <p className="leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap">耗电量</p>
        </div>
      </div>
    </div>
  );
}

function MiniPlayer() {
  return (
    <div className="backdrop-blur-[25px] content-stretch flex flex-col gap-[10px] h-[148px] items-center justify-center px-[17px] py-[9px] relative shrink-0 w-[493px]">
      <div className="absolute bg-[rgba(35,35,35,0.5)] h-[148px] left-0 rounded-[24px] top-0 w-[493px]" />
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-[454px]">
        <div className="relative rounded-[32px] shrink-0 size-[115px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full" src={albumImg} />
        </div>
        <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-[318px]">
          <div className="content-stretch flex flex-col gap-[10px] items-start justify-center leading-[normal] not-italic overflow-clip relative shrink-0 text-white w-full whitespace-nowrap">
            <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal relative shrink-0 text-[28px]">抬头看看好吗</p>
            <p className="font-['Inter:Light','Noto_Sans_JP:Light',sans-serif] font-light relative shrink-0 text-[20px]">杜宣达</p>
          </div>
          <div className="gap-x-[11px] gap-y-[11px] grid grid-cols-[repeat(4,minmax(0,1fr))] relative shrink-0 w-full">
            {[
              { viewBox: "0 0 33 30", path: navigationIcons.p27b7ab00, fill: "#F9686B" },
              { viewBox: "0 0 28 32", path: navigationIcons.pf5bf330, fill: "white", fillOpacity: 0.85098 },
              { viewBox: "0 0 45 45", path: navigationIcons.p34f48580, fill: "white", fillOpacity: 0.85098 },
              { viewBox: "0 0 28 32", path: navigationIcons.p30827e40, fill: "white", fillOpacity: 0.85098 },
            ].map((icon, i) => (
              <div key={i} className="content-stretch flex items-center justify-center overflow-clip p-[9px] relative shrink-0 size-[72px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={icon.viewBox}>
                  <path d={icon.path} fill={icon.fill} fillOpacity={icon.fillOpacity} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page Root ── */
export function NavigationPage() {
  const navigate = useNavigate();
  const defaultQuery = "成都 天府广场";
  const [searchValue, setSearchValue] = useState(defaultQuery);
  const [activeQuery, setActiveQuery] = useState(defaultQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([defaultQuery, "成都东站", "天府国际机场"]);

  // useMemo is correct here: pure derivation of a URL string from state, no side effects
  const mapUrl = useMemo(() => createBaiduMapUrl(activeQuery), [activeQuery]);

  const applySearch = (query: string) => {
    const q = query.trim();
    if (!q) return;
    setSearchValue(q);
    setActiveQuery(q);
    setRecentSearches((prev) => [q, ...prev.filter((item) => item !== q)].slice(0, 5));
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applySearch(searchValue);
  };

  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="导航">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[207.34%] left-[-2.39%] max-w-none top-[-56.6%] w-[103.26%]" src={bgImg} />
      </div>
      <StatusBar />
      <div className="content-stretch flex gap-[16px] items-center pr-[12px] py-[12px] relative size-full">
        <PageSidebar activePage="nav" />
        <div className="content-stretch flex h-[652px] items-start justify-start gap-[16px] relative rounded-[32px] shrink-0 w-[1778px]">
          {/* Gesture Window (absolute positioned for nav layout) */}
          <div className="content-stretch flex flex-col h-[652px] items-start relative shrink-0 w-[300px]">
            <GestureWindow
              absolute
              heightClass="h-[658px]"
              onGestureDetected={(gesture) => {
                if (gesture === "Swipe_Up" || gesture === "Swipe_Down" || gesture === "Pointing_Up") {
                  navigate("/");
                } else if (gesture === "Victory" || gesture === "ILoveYou") {
                  navigate("/music");
                }
              }}
            />
          </div>
          {/* Map + Controls */}
          <div className="h-full relative flex-1 min-w-0">
            <MapPanel mapUrl={mapUrl} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="content-stretch flex items-end justify-between relative size-full pointer-events-none [&>*]:pointer-events-auto">
                <div className="content-stretch flex flex-col gap-[19px] items-center relative shrink-0 w-[371px]">
                  <SearchBox
                    searchValue={searchValue}
                    onSearchValueChange={setSearchValue}
                    onSearchSubmit={handleSearchSubmit}
                  />
                  <QuickSearchPanel recentSearches={recentSearches} onQuickSearch={applySearch} />
                  <MapToolbar />
                </div>
                <TripInfo />
                <MiniPlayer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
