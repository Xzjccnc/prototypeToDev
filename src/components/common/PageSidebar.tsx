import { useNavigate } from "react-router";
import commonIcons from "@/icons/commonIcons";
import { type Page, PAGE_LABELS, PAGE_ROUTES } from "@/types";

function SidebarItem({ page, activePage }: { page: Page; activePage: Page }) {
  const navigate = useNavigate();
  const isActive = page === activePage;

  return (
    <button
      type="button"
      aria-label={PAGE_LABELS[page]}
      onClick={() => navigate(PAGE_ROUTES[page])}
      className={[
        "content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[24px] shrink-0 cursor-pointer",
        isActive ? "bg-[#5849ff]" : "",
      ].join(" ")}
    >
      <div className="relative shrink-0 size-[72px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
          {page === "home" && (
            <path d={commonIcons.p2ac9c800} fill="white" fillOpacity="0.85098" />
          )}
          {page === "nav" && (
            <path d={commonIcons.p3adeba00} fill="white" fillOpacity="0.85098" />
          )}
          {page === "device" && (
            <path d={commonIcons.p3da8c300} stroke="white" strokeOpacity="0.85098" strokeWidth="3.2" />
          )}
          {page === "music" && (
            <path d={commonIcons.pc6ab100} fill="white" fillOpacity="0.85098" />
          )}
        </svg>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
        <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[28px] text-[rgba(255,255,255,0.85)] text-center whitespace-nowrap">
          {PAGE_LABELS[page]}
        </p>
      </div>
    </button>
  );
}

interface PageSidebarProps {
  activePage: Page;
}

export function PageSidebar({ activePage }: PageSidebarProps) {
  return (
    <div
      className="content-stretch flex flex-col h-[652px] items-center justify-between min-w-[110px] overflow-clip py-[24px] relative rounded-[36px] shrink-0 w-[110px]"
      data-name="sidebar"
    >
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(38,38,38,0.72)] inset-0 mix-blend-multiply pointer-events-none rounded-[36px]" />
      {(["home", "nav", "device", "music"] as Page[]).map((page) => (
        <SidebarItem key={page} page={page} activePage={activePage} />
      ))}
    </div>
  );
}
