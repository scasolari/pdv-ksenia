import { useContext, useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import { AudioContext } from "@/pages/_app";
import { BiPause, BiPlay } from "react-icons/bi";

const AUTOPLAY_TIME = 4500;
const LONG_PRESS_TIME = 300; // ms
const FINAL_AUDIO_DELAY = 4500; // ms → quanto continua la musica sull’ultima slide
const FADE_OUT_DURATION = 2000; // ms → durata fade out

export default function SlideContainer({ slides }) {
    const containerRef = useRef(null);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const isManualScrollRef = useRef(false);

    const longPressTimerRef = useRef(null);
    const isLongPressRef = useRef(false);

    const {
        isPlaying,
        playAudio,
        pauseAudio,
        audioRef,
    } = useContext(AudioContext);

    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    // 📱 viewport height fix
    useEffect(() => {
        const setVH = () => {
            document.documentElement.style.setProperty(
                "--vh",
                `${window.innerHeight * 0.01}px`
            );
        };
        setVH();
        window.addEventListener("resize", setVH);
        return () => window.removeEventListener("resize", setVH);
    }, []);

    const goToSlide = (index) => {
        if (index < 0 || index >= slides.length) return;

        isManualScrollRef.current = true;

        setCurrent(index);
        setProgress(0);
        startTimeRef.current = null;

        containerRef.current.scrollTo({
            left: index * window.innerWidth,
            behavior: "smooth",
        });

        setTimeout(() => {
            isManualScrollRef.current = false;
        }, 300);
    };

    // 🔊 fade out audio
    const fadeOutAudio = () => {
        const audio = audioRef?.current;
        if (!audio) return;

        const startVolume = audio.volume;
        const steps = 20;
        const stepTime = FADE_OUT_DURATION / steps;
        let currentStep = 0;

        const fade = setInterval(() => {
            currentStep += 1;
            audio.volume = Math.max(
                0,
                startVolume * (1 - currentStep / steps)
            );

            if (currentStep >= steps) {
                clearInterval(fade);
                audio.pause();
                audio.volume = 1; // reset per replay
            }
        }, stepTime);
    };

    // ⏱ autoplay + progress
    useEffect(() => {
        if (!isPlaying) {
            clearInterval(timerRef.current);
            return;
        }

        startTimeRef.current = Date.now() - progress * AUTOPLAY_TIME;

        timerRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = elapsed / AUTOPLAY_TIME;

            if (newProgress >= 1) {
                clearInterval(timerRef.current);

                // ⭐ ULTIMA SLIDE
                if (current === slides.length - 1) {
                    setProgress(1);

                    setTimeout(() => {
                        fadeOutAudio();
                    }, FINAL_AUDIO_DELAY);

                    return;
                }

                setProgress(0);
                goToSlide(current + 1);
            } else {
                setProgress(newProgress);
            }
        }, 50);

        return () => clearInterval(timerRef.current);
    }, [isPlaying, current]);

    // 👈👉 sync quando scrolli a mano
    const handleScroll = () => {
        if (isManualScrollRef.current) return;

        const scrollLeft = containerRef.current.scrollLeft;
        const index = Math.round(scrollLeft / window.innerWidth);

        if (index !== current) {
            setCurrent(index);
            setProgress(0);
            startTimeRef.current = null;
        }
    };

    // 🖐 LONG PRESS
    const handlePointerDown = () => {
        isLongPressRef.current = false;

        longPressTimerRef.current = setTimeout(() => {
            isLongPressRef.current = true;
            pauseAudio();
        }, LONG_PRESS_TIME);
    };

    const handlePointerUp = () => {
        clearTimeout(longPressTimerRef.current);

        if (isLongPressRef.current) {
            playAudio();
            isLongPressRef.current = false;
        } else {
            if (!isPlaying) playAudio();
            goToSlide(current + 1);
        }
    };

    const cancelLongPress = () => {
        clearTimeout(longPressTimerRef.current);
    };

    return (
        <div
            className="relative w-screen overflow-hidden bg-black"
            style={{ height: "calc(var(--vh) * 100)" }}
        >
            {/* TOP BAR */}
            <div className="absolute top-2 left-4 right-4 z-50 flex items-center gap-3">
                <ProgressBar
                    total={slides.length}
                    current={current}
                    progress={progress}
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        isPlaying ? pauseAudio() : playAudio();
                    }}
                    className="text-white opacity-80 hover:opacity-100 transition"
                >
                    {isPlaying ? <BiPause size={24} /> : <BiPlay size={24} />}
                </button>
            </div>

            {/* SLIDES */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={cancelLongPress}
                onPointerCancel={cancelLongPress}
                className="flex w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth"
                style={{ height: "calc(var(--vh) * 100)" }}
            >
                {slides.map((SlideComponent, index) => (
                    <div
                        key={index}
                        className="w-screen flex-shrink-0 snap-start"
                        style={{ height: "calc(var(--vh) * 100)" }}
                    >
                        {SlideComponent}
                    </div>
                ))}
            </div>
        </div>
    );
}
