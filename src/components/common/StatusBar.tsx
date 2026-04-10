import commonIcons from "@/icons/commonIcons";

export function StatusBar() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[44px] relative shrink-0 w-full" data-name="状态栏">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[32px] py-[8px] relative size-full">
          <div className="content-stretch flex gap-[28px] items-center relative shrink-0">
            {/* WiFi */}
            <div className="relative shrink-0 size-[32px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={commonIcons.p10af9980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
            {/* Signal */}
            <div className="h-[24px] relative shrink-0 w-[26px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
                <path d={commonIcons.p317f9600} fill="white" />
              </svg>
            </div>
            {/* Bluetooth */}
            <div className="h-[32px] relative shrink-0 w-[31px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 32">
                <path d={commonIcons.p22c86100} fill="white" />
              </svg>
            </div>
            {/* Battery */}
            <div className="content-stretch flex flex-col items-center justify-center overflow-clip py-[10px] relative shrink-0 size-[32px]">
              <div className="h-[12.373px] relative shrink-0 w-[25.997px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.9975 12.3729">
                  <path d={commonIcons.p26f40c00} fill="white" />
                  <path d={commonIcons.p2a89e280} fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
