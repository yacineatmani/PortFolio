import React, { useRef, useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';

interface Props {
    items: { href: string; label: string }[];
    animationTime?: number;
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    timeVariance?: number;
    colors?: number[];
    initialActiveIndex?: number;
}

const GooeyNav: React.FC<Props> = ({
    items,
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    initialActiveIndex = 0,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const filterRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const { auth } = usePage().props as { auth: { user: User | null } };

    const noise = (n = 1) => n / 2 - Math.random() * n;
    const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const createParticle = (i: number, t: number, d: [number, number], r: number) => {
        let rotate = noise(r / 10);
        return {
            start: getXY(d[0], particleCount - i, particleCount),
            end: getXY(d[1] + noise(7), particleCount - i, particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
        };
    };

    const makeParticles = (element: HTMLSpanElement) => {
        const d = particleDistances;
        const r = particleR;
        const bubbleTime = animationTime * 2 + timeVariance;
        element.style.setProperty('--time', `${bubbleTime}ms`);
        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            const p = createParticle(i, t, d, r);
            element.classList.remove('active');
            setTimeout(() => {
                const particle = document.createElement('span');
                const point = document.createElement('span');
                particle.classList.add('particle');
                particle.style.setProperty('--start-x', `${p.start[0]}px`);
                particle.style.setProperty('--start-y', `${p.start[1]}px`);
                particle.style.setProperty('--end-x', `${p.end[0]}px`);
                particle.style.setProperty('--end-y', `${p.end[1]}px`);
                particle.style.setProperty('--time', `${p.time}ms`);
                particle.style.setProperty('--scale', `${p.scale}`);
                particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
                particle.style.setProperty('--rotate', `${p.rotate}deg`);
                point.classList.add('point');
                particle.appendChild(point);
                element.appendChild(particle);
                requestAnimationFrame(() => {
                    element.classList.add('active');
                });
                setTimeout(() => {
                    try {
                        element.removeChild(particle);
                    } catch {
                        // do nothing
                    }
                }, t);
            }, 30);
        }
    };

    const updateEffectPosition = (element: HTMLLIElement) => {
        if (!containerRef.current || !filterRef.current || !textRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = element.getBoundingClientRect();
        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`,
        };
        Object.assign(filterRef.current.style, styles);
        Object.assign(textRef.current.style, styles);
        textRef.current.innerText = element.innerText;
    };

    const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
        const liEl = e.currentTarget;
        if (activeIndex === index) return;
        setActiveIndex(index);
        updateEffectPosition(liEl);
        if (filterRef.current) {
            const particles = filterRef.current.querySelectorAll('.particle');
            particles.forEach((p) => filterRef.current?.removeChild(p));
        }
        if (textRef.current) {
            textRef.current.classList.remove('active');
            void textRef.current.offsetWidth;
            textRef.current.classList.add('active');
        }
        if (filterRef.current) {
            makeParticles(filterRef.current);
        }
    };

    useEffect(() => {
        if (!navRef.current || !containerRef.current) return;
        const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
        if (activeLi) {
            updateEffectPosition(activeLi);
            textRef.current?.classList.add('active');
        }
        const resizeObserver = new ResizeObserver(() => {
            const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
            if (currentActiveLi) {
                updateEffectPosition(currentActiveLi);
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [activeIndex]);

    return (
        <div className="relative" ref={containerRef}>
            <nav className="flex relative">
                <ul ref={navRef} className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3]">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`py-[0.6em] px-[1em] rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-gray-900 dark:text-white ${activeIndex === index ? 'active' : ''}`}
                            onClick={(e) => handleClick(e, index)}
                        >
                            <Link href={item.href} className="outline-none">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    {auth.user ? (
                        <li
                            className={`py-[0.6em] px-[1em] rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-gray-900 dark:text-white`}
                            onClick={() => setActiveIndex(items.length)}
                        >
                            <Link href="/logout" method="post" className="outline-none">
                                Déconnexion
                            </Link>
                        </li>
                    ) : (
                        <li
                            className={`py-[0.6em] px-[1em] rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-gray-900 dark:text-white`}
                            onClick={() => setActiveIndex(items.length)}
                        >
                            <Link href="/login" className="outline-none">
                                Connexion
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <span className="effect filter" ref={filterRef} />
            <span className="effect text" ref={textRef} />
        </div>
    );
};

export default GooeyNav;