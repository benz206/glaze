"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function Section({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-border-soft">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left hover:bg-panel-2/60"
      >
        <Icon size={15} className="text-faint" />
        <span className="text-sm font-medium text-white">{title}</span>
        <ChevronDown
          size={15}
          className={cn(
            "ml-auto text-faint transition-transform",
            !open && "-rotate-90",
          )}
        />
      </button>
      {open && <div className="space-y-3.5 px-4 pb-4 pt-0.5">{children}</div>}
    </section>
  );
}
