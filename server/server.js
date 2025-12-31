import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import cors from "@fastify/cors";
import fetch from "node-fetch";

const fastify = Fastify({ logger: true });
fastify.register(cors, { origin: true });

const TMDB = "https://api.themoviedb.org/3";
const IMG_POSTER = "https://image.tmdb.org/t/p/w500";
const IMG_BACKDROP = "https://image.tmdb.org/t/p/original";

/* ======================================================
   🎬 RECOMMEND MOVIES
====================================================== */

fastify.post("/recommend", async (request, reply) => {
    const { user_input } = request.body;
    const API_KEY = process.env.TMDB_API_KEY;

    if (!user_input || user_input.trim().length < 2) {
        return reply.send({ recommendations: [] });
    }

    const q = user_input.toLowerCase().trim();
    let movies = [];

    const INDIAN_LANGUAGES = {
        kannada: "kn",
        telugu: "te",
        tamil: "ta",
        malayalam: "ml",
        hindi: "hi",
        marathi: "mr",
        bengali: "bn",
        punjabi: "pa",
        gujarati: "gu",
        odia: "or",
        assamese: "as",
    };

    const WORLD_LANGUAGES = {
        english: "en",
        korean: "ko",
        japanese: "ja",
        spanish: "es",
        french: "fr",
        chinese: "zh",
        german: "de",
        italian: "it",
        arabic: "ar",
        turkish: "tr",
    };

    try {
        /* 1️⃣ INDIAN LANGUAGE SEARCH */
        for (const lang in INDIAN_LANGUAGES) {
            if (q.includes(lang)) {
                const res = await fetch(
                    `${TMDB}/discover/movie?api_key=${API_KEY}&with_origin_country=IN&with_original_language=${INDIAN_LANGUAGES[lang]}&sort_by=popularity.desc`
                );
                const data = await res.json();
                movies = data.results || [];
                break;
            }
        }

        /* 2️⃣ WORLD LANGUAGE SEARCH */
        if (movies.length === 0) {
            for (const lang in WORLD_LANGUAGES) {
                if (q.includes(lang)) {
                    const res = await fetch(
                        `${TMDB}/discover/movie?api_key=${API_KEY}&with_original_language=${WORLD_LANGUAGES[lang]}&sort_by=popularity.desc`
                    );
                    const data = await res.json();
                    movies = data.results || [];
                    break;
                }
            }
        }

        /* 3️⃣ ACTOR / ACTRESS SEARCH */
        if (movies.length === 0) {
            const cleaned = q.replace(
                /\b(movies|movie|films|film|cinema|list)\b/g,
                ""
            );

            const personRes = await fetch(
                `${TMDB}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(cleaned)}`
            );
            const personData = await personRes.json();

            if (personData.results?.length) {
                const personId = personData.results[0].id;
                const creditsRes = await fetch(
                    `${TMDB}/person/${personId}/movie_credits?api_key=${API_KEY}`
                );
                const creditsData = await creditsRes.json();
                movies = creditsData.cast || [];
            }
        }

        /* 4️⃣ MOVIE NAME → RECOMMENDATIONS */
        if (movies.length === 0) {
            const movieRes = await fetch(
                `${TMDB}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(q)}`
            );
            const movieData = await movieRes.json();

            if (movieData.results?.length) {
                const movieId = movieData.results[0].id;
                const recRes = await fetch(
                    `${TMDB}/movie/${movieId}/recommendations?api_key=${API_KEY}`
                );
                const recData = await recRes.json();
                movies = recData.results || [];
            }
        }

        /* 5️⃣ FINAL FALLBACK (POPULAR INDIA + WORLD) */
        if (movies.length === 0) {
            const [indiaRes, worldRes] = await Promise.all([
                fetch(`${TMDB}/discover/movie?api_key=${API_KEY}&with_origin_country=IN&sort_by=popularity.desc`),
                fetch(`${TMDB}/movie/popular?api_key=${API_KEY}`)
            ]);

            const indiaData = await indiaRes.json();
            const worldData = await worldRes.json();

            movies = [...(indiaData.results || []), ...(worldData.results || [])];
        }

        /* ✅ REMOVE DUPLICATES */
        const uniqueMovies = Array.from(
            new Map(movies.map(m => [m.id, m])).values()
        );

        /* 🎁 RESPONSE */
        const recommendations = uniqueMovies.slice(0, 10).map(m => ({
            id: m.id,
            title: m.title,
            description: m.overview || "No description available",
            releaseDate: m.release_date || "N/A",
            poster: m.poster_path ? `${IMG_POSTER}${m.poster_path}` : null,
            backdrop: m.backdrop_path ? `${IMG_BACKDROP}${m.backdrop_path}` : null,
        }));

        return { recommendations };

    } catch (err) {
        fastify.log.error(err);
        reply.status(500).send({ error: "Failed to fetch recommendations" });
    }
});

/* ======================================================
   🎭 MOVIE CREDITS (NO LOADING, JUST NAMES)
====================================================== */

fastify.get("/movie/:id/credits", async (request, reply) => {
    const { id } = request.params;
    const API_KEY = process.env.TMDB_API_KEY;

    try {
        const res = await fetch(
            `${TMDB}/movie/${id}/credits?api_key=${API_KEY}`
        );
        const data = await res.json();

        const cast = (data.cast || []).slice(0, 6).map(a => a.name);

        const crew = data.crew || [];

        return {
            cast,
            director: crew.find(c => c.job === "Director")?.name || "N/A",
            producer: crew.find(c => c.job === "Producer")?.name || "N/A",
            music:
                crew.find(c =>
                    ["Original Music Composer", "Music Director", "Composer"].includes(c.job)
                )?.name || "N/A",
        };

    } catch (err) {
        fastify.log.error(err);
        reply.status(500).send({ error: "Failed to fetch credits" });
    }
});


/* ================= MOVIE FULL DETAILS ================= */

fastify.get("/movie/:id/details", async (request, reply) => {
    const { id } = request.params;
    const API_KEY = process.env.TMDB_API_KEY;

    try {
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        ]);

        const details = await detailsRes.json();
        const credits = await creditsRes.json();
        const videos = await videosRes.json();

        const trailer = videos.results?.find(
            v => v.type === "Trailer" && v.site === "YouTube"
        );

        return {
            imdbRating: details.vote_average
                ? details.vote_average.toFixed(1)
                : "N/A",

            runtime: details.runtime
                ? `${details.runtime} min`
                : "N/A",

            genres: details.genres?.map(g => g.name) || [],

            cast: (credits.cast || []).slice(0, 8).map(c => ({
                name: c.name,
                photo: c.profile_path
                    ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
                    : null
            })),

            trailerKey: trailer ? trailer.key : null
        };
    } catch (err) {
        fastify.log.error(err);
        reply.status(500).send({ error: "Failed to fetch movie details" });
    }
});

/* ======================================================
   🚀 START SERVER
====================================================== */

const PORT = process.env.PORT || 3000;

fastify.listen(
    { port: PORT, host: "0.0.0.0" },
    (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        console.log(`🚀 Server running at ${address}`);
    }
);
