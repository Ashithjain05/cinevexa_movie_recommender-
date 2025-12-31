import { useState } from 'react';
import Hero from './components/Hero';
import Input from './components/Input';
import Button from './components/Button';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';

function App() {
    const [query, setQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    // ✅ IMPORTANT: now receives event
    const handleSearch = async (e) => {
        e.preventDefault(); // 🚫 stop page reload

        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setRecommendations([]);

        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

        try {
            const response = await fetch(`${API_URL}/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: query }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }

            const data = await response.json();
            setRecommendations(data.recommendations || []);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <Hero />

            {/* ✅ FORM ENABLES ENTER KEY */}
            <form
                onSubmit={handleSearch}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}
            >
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a genre, actor, language, year..."
                    disabled={loading}
                />

                {/* type="submit" is IMPORTANT */}
                <Button
                    type="submit"
                    loading={loading}
                    disabled={!query.trim()}
                >
                    Get Recommendations
                </Button>
            </form>

            {error && (
                <div style={{ color: '#ff6b6b', marginTop: '1rem' }}>
                    {error}
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                width: '100%',
                marginTop: '2rem'
            }}>
                {recommendations.map((movie, index) => (
                    <MovieCard
                        key={movie.id || index}
                        movie={movie}
                        index={index}
                        onClick={setSelectedMovie}
                    />
                ))}
            </div>

            <MovieModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
}

export default App;
