import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Dashboard() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="border border-input h-[100vh]"
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6 ">
            <span className="font-semibold">Temperature</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={15}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Sea Level</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={35}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Trees Planted</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ResizableHandle />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Custom City Data</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Renewable Energy</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanelGroup>
  );
}
