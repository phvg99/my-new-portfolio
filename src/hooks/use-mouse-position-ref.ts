import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) => {
  const positionRef = useRef({ x: 0, y: 0 });
  const cachedRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const refreshRect = () => {
      if (containerRef?.current) {
        cachedRectRef.current = containerRef.current.getBoundingClientRect();
      }
    };

    const updatePosition = (x: number, y: number) => {
      if (containerRef && cachedRectRef.current) {
        const rect = cachedRectRef.current;
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    let ticking = false;
    const staged = { x: 0, y: 0 };

    const handleMouseMove = (ev: MouseEvent) => {
      staged.x = ev.clientX;
      staged.y = ev.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updatePosition(staged.x, staged.y);
          ticking = false;
        });
      }
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      staged.x = touch.clientX;
      staged.y = touch.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updatePosition(staged.x, staged.y);
          ticking = false;
        });
      }
    };

    // Initial rect cache
    refreshRect();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("scroll", refreshRect, true);
    window.addEventListener("resize", refreshRect);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", refreshRect, true);
      window.removeEventListener("resize", refreshRect);
    };
  }, [containerRef]);

  return positionRef;
};
