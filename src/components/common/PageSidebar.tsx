import { useNavigate } from "react-router";
import commonIcons from "@/icons/commonIcons";
import { type Page, PAGE_LABELS, PAGE_ROUTES } from "@/types";

function SidebarItem({ page, activePage }: { page: Page; activePage: Page }) {
  const navigate = useNavigate();
  const isActive = page === activePage;

  const iconOpacity = isActive ? 1 : 0.85098;
  const textColor = isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.85)";

  return (
    <button
      type="button"
      aria-label={PAGE_LABELS[page]}
      onClick={() => navigate(PAGE_ROUTES[page])}
      className={[
        "content-stretch flex flex-col gap-[8px] items-center overflow-clip relative rounded-[24px] shrink-0 cursor-pointer",
        isActive ? "bg-[#5849ff] p-[8px]" : "p-[8px]",
      ].join(" ")}
    >
      <div className="relative shrink-0 size-[72px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
          {page === "home" && (
            <path d={commonIcons.p2ac9c800} fill="white" fillOpacity={iconOpacity} />
          )}
          {page === "nav" && (
            <path d={commonIcons.p3adeba00} fill="white" fillOpacity={iconOpacity} />
          )}
          {page === "device" && (
            <path d={commonIcons.p3da8c300} stroke="white" strokeOpacity={iconOpacity} strokeWidth="3.2" />
          )}
          {page === "music" && (
            <path d={commonIcons.pc6ab100} fill="white" fillOpacity={iconOpacity} />
          )}
        </svg>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
        <p
          className={[
            "font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[28px] text-center whitespace-nowrap",
            isActive ? "leading-[28px]" : "leading-none",
          ].join(" ")}
          style={{ color: textColor }}
        >
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
      className="content-stretch flex flex-col h-full items-center justify-between min-w-[110px] overflow-clip py-[24px] relative rounded-[36px] shrink-0 w-[110px]"
      data-name="sidebar"
    >
      <div aria-hidden="true" className="absolute backdrop-blur-[25px] bg-[rgba(38,38,38,0.9)] inset-0 mix-blend-multiply pointer-events-none rounded-[36px]" />
      {(["home", "nav", "device", "music"] as Page[]).map((page) => (
        <SidebarItem key={page} page={page} activePage={activePage} />
      ))}
    </div>
  );
}
