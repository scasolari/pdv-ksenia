import "@/styles/globals.css";
import { createContext, useRef, useState } from "react";

export const AudioContext = createContext(null);

export default function App({ Component, pageProps }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = async () => {
        if (!audioRef.current) return;
        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch {}
    };

    const pauseAudio = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
    };

    return (
        <AudioContext.Provider
            value={{ audioRef, isPlaying, playAudio, pauseAudio }}
        >
            <audio
                ref={audioRef}
                src="/audio/background.mp3"
                loop
                preload="auto"
            />
            <Component {...pageProps} />
        </AudioContext.Provider>
    );
}
