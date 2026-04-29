import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/constants";
import { HomePage } from "@/features/home/HomePage";
import { NavigationPage } from "@/features/navigation/NavigationPage";
import { DevicePage } from "@/features/device/DevicePage";
import { MusicPage } from "@/features/music/MusicPage";

export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / CANVAS_WIDTH, window.innerHeight / CANVAS_HEIGHT));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nav" element={<NavigationPage />} />
          <Route path="/device" element={<DevicePage />} />
          <Route path="/music" element={<MusicPage />} />
        </Routes>
      </div>
    </div>
  );
}
