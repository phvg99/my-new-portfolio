"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/components/providers/language-provider";
import { assetPath } from "@/lib/utils";

function LocalTime({ locale }: { locale: string }) {
  const [time, setTime] = useState<string>("");

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZoneName: "short",
      }),
    [locale],
  );

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeFormatter]);

  return <span className="tabular-nums">{time}</span>;
}

const linkClass =
  "inline-block font-mono text-2xl uppercase tracking-loose text-white transition-colors hover:text-yellow md:text-4xl";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[var(--max-width-container)] px-6 pt-20 pb-12">
        {/* Main row: Nav | Social | Status */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* Social links */}
          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/in/pedrohvg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.linkedinAria}
              className={linkClass}
            >
              {t.footer.linkedin}
            </a>
            <a
              href={assetPath("/resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.resumeAria}
              className={linkClass}
            >
              {t.footer.resume}
            </a>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping bg-yellow opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 bg-yellow" />
              </span>
              <span className="font-mono text-2xl uppercase tracking-loose text-white md:text-4xl">
                {t.footer.availableForWork}
              </span>
            </div>
            <div className="pl-[22px] font-mono text-xs uppercase tracking-loose text-white/56">
              {t.footer.localTime} <LocalTime locale={t.meta.timeLocale} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-[var(--max-width-container)] px-6 pb-10">
        <div className="border-t border-border pt-6">
          <div className="flex w-full flex-col items-center justify-between gap-2 font-mono text-xs uppercase tracking-loose text-white/56 sm:flex-row">
            <span>&copy; {new Date().getFullYear()} {t.footer.rightsReserved}</span>
            <span>{t.footer.builtWithCare}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
