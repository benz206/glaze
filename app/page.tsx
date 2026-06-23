"use client";

import { useRef } from "react";
import { Toolbar } from "@/components/Toolbar";
import { ControlPanel } from "@/components/panel/ControlPanel";
import { SnippetCanvas } from "@/components/editor/SnippetCanvas";
import { StudioModal } from "@/components/studio/StudioModal";

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen flex-col bg-canvas text-white">
      <Toolbar canvasRef={canvasRef} />

      <div className="flex min-h-0 flex-1">
        <main
          className="glaze-scroll flex-1 overflow-auto"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div
            className="flex min-h-full p-12"
            style={{ justifyContent: "safe center", alignItems: "safe center" }}
          >
            <SnippetCanvas ref={canvasRef} />
          </div>
        </main>

        <ControlPanel />
      </div>

      <StudioModal />
    </div>
  );
}
