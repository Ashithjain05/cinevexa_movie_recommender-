import { motion } from 'framer-motion';

const MovieCard = ({ movie, index, onClick }) => {
    return (
        <motion.div
            layoutId={`movie-card-${movie.title}`}
            onClick={() => onClick(movie)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="movie-card"
        >
            <h2 className="movie-card-title">
                {movie.title}
            </h2>
            <p className="movie-card-reason">
                {movie.reason}
            </p>
        </motion.div>
    );
};

export default MovieCard;
