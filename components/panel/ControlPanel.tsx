"use client";

import { CodeSection } from "./CodeSection";
import { WindowSection } from "./WindowSection";
import { ControlsSection } from "./ControlsSection";
import { CopyButtonSection } from "./CopyButtonSection";
import { BackgroundSection } from "./BackgroundSection";

export function ControlPanel() {
  return (
    <aside className="glaze-scroll w-[320px] shrink-0 overflow-y-auto border-l border-border bg-panel">
      <CodeSection />
      <WindowSection />
      <ControlsSection />
      <CopyButtonSection />
      <BackgroundSection />
    </aside>
  );
}
