"use client";

import { useRef } from "react";
import { Toolbar } from "@/components/Toolbar";
import { ControlPanel } from "@/components/panel/ControlPanel";
import { CanvasStage } from "@/components/editor/CanvasStage";
import { StudioModal } from "@/components/studio/StudioModal";

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen flex-col bg-canvas text-white">
      <Toolbar canvasRef={canvasRef} />

      <div className="flex min-h-0 flex-1">
        <CanvasStage canvasRef={canvasRef} />
        <ControlPanel />
      </div>

      <StudioModal />
    </div>
  );
}
