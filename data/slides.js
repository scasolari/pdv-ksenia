import Slide from "@/components/Slide";
import { motion } from "framer-motion";

export const slides = [
    <Slide
        key={0}
        title="Il tuo 2025 con me"
        subtitle="Grazie per averlo ascoltato fino in fondo"
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_1.jpg"
        emoji="❤️"
    />,

    <Slide
        key={7}
        title="Prima traccia riprodotta"
        subtitle="La nostra prima uscita"
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_8.jpg"
        emoji="👩‍❤️‍👩"
    />,

    <Slide emoji="⏳" key={1} backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_2.jpg">
        <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-black"
        >
            131400
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl mt-4 opacity-80"
        >
            minuti insieme
        </motion.p>
    </Slide>,

    <Slide
        key={2}
        title="Top ricordo dell’inverno"
        subtitle="Il nostro primo Natale insieme"
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_3.jpg"
        emoji="🎄❄️"
    />,

    <Slide
        key={9}
        title="Momento più festeggiato dell’anno"
        subtitle="Il nostro primo Capodanno"
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_10.jpg"
        emoji="🥂🎆"
    />,

    <Slide
        key={3}
        title="Il suo hobby preferito"
        subtitle="Mangiare. Sempre."
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_4.jpg"
        emoji="🍣🍔🥐"
    />,

    <Slide
        key={4}
        title="Il nostro momento preferito"
        subtitle="Cucinare insieme"
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_5.jpg"
        emoji="👩🏼‍🍳🧑🏼‍🍳"
    />,

    <Slide
        key={5}
        title="Top momenti tranquilli"
        subtitle="Le nostre passeggiate "
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_6.jpg"
        emoji="🥾🌊"
    />,

    <Slide
        key={6}
        title="Le prime lezioni di guida"
        subtitle="Con più risate che freni"
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_7.jpg"
        emoji="🚗"
    />,

    <Slide
        key={8}
        title="Se questo era solo l’inizio"
        subtitle="Non vedo l’ora del resto"
        backgroundImage="https://pdv-ksenia.s3.eu-west-1.amazonaws.com/images/image_9.jpg"
        emoji="✨"
    />,
];
