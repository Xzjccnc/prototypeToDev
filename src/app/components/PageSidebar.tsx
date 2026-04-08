import svgPaths from "../../imports/svg-lmji27raq";

type Page = "home" | "nav" | "device" | "music";

interface PageSidebarProps {
  activePage: Page;
  onNavigate?: (page: Page) => void;
  dataName?: string;
}

function SidebarItem({
  page,
  activePage,
  onNavigate,
}: {
  page: Page;
  activePage: Page;
  onNavigate?: (page: Page) => void;
}) {
  const isActive = page === activePage;
  const clickable = Boolean(onNavigate);
  const label = page === "home" ? "主页" : page === "nav" ? "导航" : page === "device" ? "设备" : "音乐";

  return (
    <button
      type="button"
      onClick={() => onNavigate?.(page)}
      className={`${isActive ? "bg-[#5849ff]" : ""} content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[24px] shrink-0 ${clickable ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="relative shrink-0 size-[72px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
          {page === "home" && <path d={svgPaths.p2ac9c800} fill="white" fillOpacity="0.85098" />}
          {page === "nav" && <path d={svgPaths.p3adeba00} fill="white" fillOpacity="0.85098" />}
          {page === "device" && <path d={svgPaths.p3da8c300} stroke="white" strokeOpacity="0.85098" strokeWidth="3.2" />}
          {page === "music" && <path d={svgPaths.pc6ab100} fill="white" fillOpacity="0.85098" />}
        </svg>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
        <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">
          {label}
        </p>
      </div>
    </button>
  );
}

export function PageSidebar({ activePage, onNavigate, dataName = "sider-bar" }: PageSidebarProps) {
  return (
    <div
      className="content-stretch flex flex-col h-[652px] items-center justify-between min-w-[110px] overflow-clip py-[24px] relative rounded-[36px] shrink-0 w-[110px]"
      data-name={dataName}
    >
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(38,38,38,0.72)] inset-0 mix-blend-multiply pointer-events-none rounded-[36px]" />
      <SidebarItem page="home" activePage={activePage} onNavigate={onNavigate} />
      <SidebarItem page="nav" activePage={activePage} onNavigate={onNavigate} />
      <SidebarItem page="device" activePage={activePage} onNavigate={onNavigate} />
      <SidebarItem page="music" activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}
