'use client';
import React, { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

type WWavePathProps = React.ComponentProps<'div'>;

export function WavePath({ className, ...props }: WWavePathProps) {
	const pathRef = useRef<SVGPathElement>(null);
	const progressRef = useRef(0);
	const xRef = useRef(0.2);
	const timeRef = useRef(Math.PI / 2);
	const reqIdRef = useRef<number | null>(null);
	const animateOutRef = useRef<() => void>(() => {});

	const setPath = useCallback((progress: number) => {
		if (typeof window === "undefined" || !pathRef.current) return;
		const width = window.innerWidth * 0.85;
		if (pathRef.current) {
			pathRef.current.setAttributeNS(
				null,
				'd',
				`M0 100 Q${width * xRef.current} ${100 + progress * 0.6}, ${width} 100`,
			);
		}
	}, []);

	const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

	const resetAnimation = useCallback(() => {
		timeRef.current = Math.PI / 2;
		progressRef.current = 0;
	}, []);

	useEffect(() => {
		animateOutRef.current = () => {
			const newProgress = progressRef.current * Math.sin(timeRef.current);
			progressRef.current = lerp(progressRef.current, 0, 0.025);
			timeRef.current += 0.2;
			setPath(newProgress);
			if (Math.abs(progressRef.current) > 0.75) {
				reqIdRef.current = requestAnimationFrame(animateOutRef.current);
			} else {
				resetAnimation();
			}
		};
	}, [setPath, resetAnimation]);

	useEffect(() => {
		setPath(progressRef.current);
	}, [setPath]);

	const manageMouseEnter = useCallback(() => {
		if (reqIdRef.current) {
			cancelAnimationFrame(reqIdRef.current);
			resetAnimation();
		}
	}, [resetAnimation]);

	const manageMouseMove = useCallback((e: React.MouseEvent) => {
		const { movementY, clientX } = e;
		if (pathRef.current) {
			const pathBound = pathRef.current.getBoundingClientRect();
			xRef.current = (clientX - pathBound.left) / pathBound.width;
			progressRef.current += movementY;
			setPath(progressRef.current);
		}
	}, [setPath]);

	const manageMouseLeave = useCallback(() => {
		animateOutRef.current();
	}, []);

	return (
		<div className={cn('relative h-px w-[85vw]', className)} {...props}>
			<div
				onMouseEnter={manageMouseEnter}
				onMouseMove={manageMouseMove}
				onMouseLeave={manageMouseLeave}
				className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
			/>
			<svg className="absolute -top-[100px] h-[300px] w-full drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
				<path ref={pathRef} className="fill-none stroke-current" strokeWidth={2} />
			</svg>
		</div>
	);
}
