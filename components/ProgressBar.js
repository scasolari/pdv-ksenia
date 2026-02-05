export default function ProgressBar({ total, current, progress }) {
    return (
        <div className="flex flex-1 gap-2">
            {Array.from({ length: total }).map((_, index) => {
                // slide già viste
                if (index < current) {
                    return (
                        <div
                            key={index}
                            className="flex-1 h-1 bg-white rounded-full"
                        />
                    );
                }

                // slide corrente
                if (index === current) {
                    return (
                        <div
                            key={index}
                            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                        >
                            <div
                                className="h-full bg-white"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                    );
                }

                // slide future
                return (
                    <div
                        key={index}
                        className="flex-1 h-1 bg-white/30 rounded-full"
                    />
                );
            })}
        </div>
    );
}
