import { useEffect, useState } from "react";
import FirebaseInteraction from "./FirebaseInteraction";
import ReactPlayer from 'react-player/youtube'
import BackButton from "./BackButton";
import Ternary from "./Ternary";

const MovieDetails = (props) => {
    const {movieID} = props.match.params;
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true) 
    const [director, setDirector] = useState('')
    
    useEffect( () => {
        const apiKey = '9709355fc5ce17fa911605a13712678d';
        const movieURL = `https://api.themoviedb.org/3/movie/${movieID}`;
        setLoading(true)
        const url = new URL(movieURL);
        url.search = new URLSearchParams({
            api_key: apiKey,
            append_to_response: 'videos,credits'
        })
        fetch(url)
        .then( (rawData) => {
            return rawData.json();
        }).then( (jsonData) => {
            setMovieDetails(jsonData)

            const findingDirector = jsonData.credits.crew.find( (position) => {
                    return position.job === "Director"
            })

            findingDirector === undefined ? setDirector('') : setDirector(findingDirector)

            setLoading(false)
        })
    }, [movieID])



    return(
        loading ? <p> Loading </p> :
        <div>
            <h1>{movieDetails.title}</h1>

            <FirebaseInteraction
                movieDetails={movieDetails}
            />

            {movieDetails.imdb_id ? <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}>IMDB</a> : null}
            <Ternary input={movieDetails.original_language.toUpperCase()} category="Language: " />
            <Ternary input={movieDetails.budget} category="Budget: $" />
            <Ternary input={movieDetails.revenue} category="Revenue: $" />
            <Ternary input={movieDetails.runtime} category="Runtime: " ending=" minutes" />
            <Ternary input={movieDetails.tagline} category="Tag Line: " />
            <Ternary input={movieDetails.overview} category="Summary: " />
            <Ternary input={movieDetails.release_date} category="Release Date: " />
            <Ternary input={director.name} category="Director: " />


            { movieDetails.videos.results[0] 
            ? <ReactPlayer url={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`} />
            : null
            }

            {
                movieDetails.credits.cast ?             
                    <ul>
                        {
                            movieDetails.credits.cast.slice(0,5).map( (actor) => {
                                // console.log(director);
                                return <li key={actor.id}>{actor.name}</li>;
                            })
                        }
                    </ul>
                : null
            }

            {
                movieDetails.genres ?
                    <ul>
                        {
                            movieDetails.genres.map( (genre) => {
                                return <li key={genre.id}>{genre.name}</li>;
                            })
                        }
                    </ul>
                : null
            }

            {
                movieDetails.poster_path ?
                    <img 
                        src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} 
                        alt={`Movie poster for ${movieDetails.title}`} 
                    />
                : null
            }

            {
                movieDetails.backdrop_path ?
                    <img 
                        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} 
                        alt={`Backdrop path for ${movieDetails.title}`} 
                    />
                : null
            }

            <BackButton />

        </div> 
    ) 
}

export default MovieDetails;