import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Dashboard() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="border border-input h-screen"
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Temperature</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Sea Level</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Trees Planted</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ResizableHandle />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Custom City Data</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Renewable Energy</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanelGroup>
  );
}

{
  /* <ResizablePanel>
        <div className="flex h-[80vh] items-center justify-center p-6">
          <span className="font-semibold">Temperature</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        
      </ResizablePanel> */
}
