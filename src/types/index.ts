export type Page = "home" | "nav" | "device" | "music";

export const PAGE_ROUTES: Record<Page, string> = {
  home: "/",
  nav: "/nav",
  device: "/device",
  music: "/music",
};

export const PAGE_LABELS: Record<Page, string> = {
  home: "主页",
  nav: "导航",
  device: "设备",
  music: "音乐",
};
