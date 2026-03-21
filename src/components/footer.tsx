"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CenterUnderline,
  ComesInGoesOutUnderline,
  GoesOutComesInUnderline,
} from "@/components/ui/underline-animation";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZoneName: "short",
});

function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        {/* Main row: Nav | LinkedIn | Status */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-16">
          {/* Navigation links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/work"
              className="inline-block text-3xl uppercase tracking-[0.08em] text-background/80 transition-colors hover:text-background md:text-5xl"
            >
              <CenterUnderline label="Work" />
            </Link>
            <Link
              href="/about"
              className="inline-block text-3xl uppercase tracking-[0.08em] text-background/80 transition-colors hover:text-background md:text-5xl"
            >
              <CenterUnderline label="About" />
            </Link>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-2">
            <a
              href="https://www.linkedin.com/in/pedrohvg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-block text-3xl uppercase tracking-[0.08em] text-background/80 transition-colors hover:text-background md:text-5xl"
            >
              <ComesInGoesOutUnderline label="LinkedIn" direction="left" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume"
              className="inline-block text-3xl uppercase tracking-[0.08em] text-background/80 transition-colors hover:text-background md:text-5xl"
            >
              <ComesInGoesOutUnderline label="Resume" direction="left" />
            </a>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-3xl uppercase tracking-[0.08em] text-background/80 md:text-5xl">
                <GoesOutComesInUnderline
                  label="Available for work"
                  direction="left"
                />
              </span>
            </div>
            <div className="pl-[22px] text-sm text-background/40">
              Local time: <LocalTime />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="border-t border-background/10 pt-6">
          <div className="flex w-full flex-col items-center justify-between gap-2 text-xs text-background/30 sm:flex-row">
            <span>
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
            <span>Designed & built with care.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
