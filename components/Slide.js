import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

export default function Slide({
                                  emoji,
                                  title,
                                  subtitle,
                                  backgroundImage,
                                  overlay = true,
                                  children,
                                  priority = false, // 👈 nuovo
                              }) {
    return (
        <div className="relative w-full overflow-hidden" style={{ height: "calc(var(--vh) * 100)" }}>
            {/* BACKGROUND IMAGE OPTIMIZZATA */}
            {backgroundImage && (
                <Image
                    src={backgroundImage}
                    alt=""
                    fill
                    priority={priority}
                    sizes="100vw"
                    className="object-cover"
                />
            )}

            {/* OVERLAY */}
            {overlay && <div className="absolute inset-0 bg-black/50" />}

            {/* CONTENT */}
            <motion.div
                className="relative z-10 h-full w-full flex flex-col justify-end px-6 py-20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {emoji && (
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-6xl font-extrabold mb-4"
                    >
                        {emoji}
                    </motion.h1>
                )}

                {title && (
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-6xl font-extrabold mb-4"
                    >
                        {title}
                    </motion.h1>
                )}

                {subtitle && (
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl font-black"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {children}
            </motion.div>
        </div>
    );
}
