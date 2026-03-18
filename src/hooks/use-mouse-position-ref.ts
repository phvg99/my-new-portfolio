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

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
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
