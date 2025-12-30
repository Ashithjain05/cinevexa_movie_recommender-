import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1rem', // Reduced from 3rem
            position: 'relative',
            zIndex: 10
        }}>
            {/* 🎞 DETAILED COSMIC FILM REEL */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, type: "spring" }}
                style={{
                    marginBottom: '0.5rem', // Reduced from 1.5rem
                    filter: 'drop-shadow(0 0 35px rgba(0, 255, 255, 0.5))'
                }}
            >
                <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="reelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="50%" stopColor="#0088ff" />
                            <stop offset="100%" stopColor="#8a2be2" />
                        </linearGradient>
                        <linearGradient id="swirlGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
                            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#8a2be2" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* 🌀 Swirling Orbit Trails (Behind) */}
                    <motion.path
                        d="M20,100 Q50,20 180,50"
                        stroke="url(#swirlGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                    />
                    <motion.path
                        d="M180,100 Q150,180 20,150"
                        stroke="url(#swirlGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        style={{ rotate: 180, transformOrigin: 'center' }}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                    />

                    {/* 📼 Film Strip Tail */}
                    <path
                        d="M140,140 C160,160 190,140 190,120"
                        stroke="#8a2be2"
                        strokeWidth="12"
                        strokeLinecap="round"
                        opacity="0.6"
                    />
                    <path
                        d="M140,140 C160,160 190,140 190,120"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 6"
                        opacity="0.4"
                        fill="none"
                    />

                    {/* 🎥 MAIN REEL BODY (Tilted Perspective) */}
                    <g transform="translate(100 100) rotate(-15) translate(-100 -100)">
                        {/* Outer Rim */}
                        <circle cx="100" cy="100" r="60" fill="#0b0b12" stroke="url(#reelGradient)" strokeWidth="6" />

                        {/* Inner Rim */}
                        <circle cx="100" cy="100" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

                        {/* 6 Holes */}
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <circle
                                key={deg}
                                cx="100"
                                cy="70"
                                r="14"
                                fill="url(#reelGradient)"
                                opacity="0.9"
                                transform={`rotate(${deg} 100 100)`}
                            />
                        ))}

                        {/* Center Hub */}
                        <circle cx="100" cy="100" r="12" fill="#00ffff" />
                        <circle cx="100" cy="100" r="5" fill="#ffffff" />
                    </g>

                    {/* ✨ Sparkles */}
                    <circle cx="160" cy="40" r="2" fill="white" className="twinkle" style={{ animationDelay: '1s' }} />
                    <circle cx="40" cy="160" r="3" fill="#00ffff" className="twinkle" />
                </svg>
            </motion.div>

            {/* 🎬 TITLE */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                    fontSize: '4.5rem',
                    fontWeight: '800',
                    margin: 0,
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(to right, #00ffff, #8a2be2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-2px',
                    filter: 'drop-shadow(0 0 30px rgba(138, 43, 226, 0.3))'
                }}
            >
                CineVexa
            </motion.h1>

            {/* 📝 SUBTITLE */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                    fontSize: '1.25rem',
                    color: '#a0a0a0',
                    letterSpacing: '0.5px',
                    fontWeight: '400'
                }}
            >
                Discover films you’ll truly love
            </motion.p>

            <style>{`
                .twinkle {
                    animation: twinkle 2s infinite ease-in-out;
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
            `}</style>
        </div>
    );
};

export default Hero;
