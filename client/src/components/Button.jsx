import { motion } from 'framer-motion';

const Button = ({ onClick, children, disabled, loading, type = "button" }) => {
    // We use a dark background with a transparent border + gradient background origin logic
    // OR we can use a box-shadow approach for the glow.
    // Let's go with a cleaner dark button with a bottom glow.

    return (
        <motion.button
            type={type}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                borderColor: 'rgba(0, 255, 255, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled || loading}
            style={{
                padding: '1rem 3rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                color: '#fff',
                background: 'linear-gradient(180deg, rgba(30, 30, 40, 0.8) 0%, rgba(20, 20, 30, 1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                marginTop: '1rem', // Reduced from 1.5rem
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.05)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
            }}
        >
            {/* Gradient underline glow effect */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '20%',
                right: '20%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #00ffff, #8a2be2, transparent)',
                opacity: 0.7
            }} />

            {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="loader"></span> PROCESSING
                </span>
            ) : children}

            <style>{`
        .loader {
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          border-top: 2px solid #00ffff;
          width: 14px;
          height: 14px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </motion.button>
    );
};

export default Button;
