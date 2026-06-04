import { ReactFlowProvider } from "@xyflow/react";
import { Canvas } from "./Components/Canvas";
import { Requirements } from "./Components/Requirements";
import { ChatPanel } from "./Components/ChatPanel";

export function Course() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen">
        {/* Requirements Panel */}
        <div className="h-full w-[28%] border-r border-foreground/10 overflow-y-auto">
          <Requirements />
        </div>

        {/* Canvas Panel */}
        <div className="h-full w-[47%]">
          <Canvas />
        </div>

        {/* AI Tutor Chat Panel */}
        <div className="h-full w-[25%] border-l border-foreground/10">
          <ChatPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}