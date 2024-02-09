import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function AirQuality() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="border border-input h-[100vh]"
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6 ">
            <span className="font-semibold">Air Quality Stats</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={15}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Air Quality Stats</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={35}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Air Quality Stats</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ResizableHandle />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Air Quality Stats</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Air Quality Stats</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanelGroup>
  );
}
