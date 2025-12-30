import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1200";

const MovieModal = ({ movie, onClose }) => {
    const [details, setDetails] = useState(null);
    const [watchlist, setWatchlist] = useState(false);

    useEffect(() => {
        if (!movie?.id) return;

        fetch(`http://localhost:3000/movie/${movie.id}/details`)
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(() => setDetails(null));
    }, [movie]);

    if (!movie) return null;

    const imageSrc =
        movie.backdrop || movie.poster || DEFAULT_IMAGE;

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    className="modal-container"
                    onClick={e => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.96, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 40 }}
                >
                    <button className="modal-close" onClick={onClose}>✕</button>

                    {/* LEFT IMAGE */}
                    <div className="modal-left">
                        <img src={imageSrc} alt={movie.title} />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="modal-right">
                        <h2>{movie.title}</h2>

                        {/* ⭐ IMDb + Runtime */}
                        <div className="movie-meta">
                            <span>⭐ {details?.imdbRating || "N/A"}</span>
                            <span>⏱ {details?.runtime || "N/A"}</span>

                            <button
                                className={`watchlist-btn ${watchlist ? "active" : ""}`}
                                onClick={() => setWatchlist(!watchlist)}
                            >
                                ❤️ Watchlist
                            </button>
                        </div>

                        {/* 🎭 Genres */}
                        <div className="genres">
                            {details?.genres?.map(g => (
                                <span key={g} className="genre-chip">{g}</span>
                            ))}
                        </div>

                        <p className="description">{movie.description}</p>

                        {/* 👥 ACTOR GRID */}
                        <div className="cast-grid">
                            {details?.cast?.map(c => (
                                <div key={c.name} className="cast-card">
                                    <img
                                        src={c.photo || DEFAULT_IMAGE}
                                        alt={c.name}
                                    />
                                    <span>{c.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* 🎞 TRAILER */}
                        {details?.trailerKey && (
                            <div className="trailer">
                                <iframe
                                    src={`https://www.youtube.com/embed/${details.trailerKey}?autoplay=1`}
                                    title="Trailer"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default MovieModal;
