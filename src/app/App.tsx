import { useState, useEffect } from "react";
import NavPage from "../imports/导航页面高保真";
import DevicePage from "../imports/设备页";
import { HomePage } from "./components/HomePage";
import { MusicPage } from "./components/MusicPage";

type Page = "home" | "nav" | "device" | "music";

// Sidebar nav click zones (1920×720 canvas)
// Sidebar left edge: x=0, width≈130px, after status bar (44px)
// 4 items distributed with justify-between in py-24, h=652px total sidebar
// Approx per-item heights with py-24 padding: top=68, each ≈155px tall
const NAV_ZONES: { page: Page; top: number; height: number }[] = [
  { page: "home",   top: 68,  height: 155 },
  { page: "nav",    top: 223, height: 155 },
  { page: "device", top: 378, height: 155 },
  { page: "music",  top: 533, height: 155 },
];

function NavOverlay({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 200 }}>
      {NAV_ZONES.map(({ page, top, height }) => (
        <button
          key={page}
          onClick={() => onNavigate(page)}
          aria-label={page}
          style={{
            position: "absolute",
            left: 0,
            top,
            width: 130,
            height,
            pointerEvents: "auto",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 720);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "1920px", height: "720px", transform: `scale(${scale})`, transformOrigin: "center center", flexShrink: 0, overflow: "hidden" }}>
        {/* Page */}
        <div style={{ position: "absolute", inset: 0 }}>
          {activePage === "home"   && <HomePage   onNavigate={setActivePage} />}
          {activePage === "nav"    && <NavPage    onNavigate={setActivePage} />}
          {activePage === "device" && <DevicePage onNavigate={setActivePage} />}
          {activePage === "music"  && <MusicPage  onNavigate={setActivePage} />}
        </div>
        {/* Sidebar nav tap zones */}
        <NavOverlay onNavigate={setActivePage} />
      </div>
    </div>
  );
}
