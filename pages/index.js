import { useContext } from "react";
import { useRouter } from "next/router";
import { AudioContext } from "./_app";

export default function Home() {
    const router = useRouter();
    const { playAudio } = useContext(AudioContext);

    const startWrapped = async () => {
        await playAudio(); // 🎧 parte QUI (gesto utente)
        router.push("/wrapped");
    };

    return (
        <main className="h-screen flex items-center justify-center bg-black">
            <button
                onClick={startWrapped}
                className="text-2xl font-bold text-green-500"
            >
                ▶︎ Inizia il tuo Wrapped
            </button>
        </main>
    );
}
