import { useEffect, useState } from "react";
import FirebaseInteraction from "./FirebaseInteraction";
import BackButton from "./BackButton";

const MovieDetails = (props) => {
    const {movieID} = props.match.params;
    const movieURL = `https://api.themoviedb.org/3/movie/${movieID}`; // Accepts user query
    const apiKey = '9709355fc5ce17fa911605a13712678d';
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true) 
    const [director, setDirector] = useState('')
    
    useEffect( () => {
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
            // console.log(jsonData)
            setMovieDetails(jsonData)

            const findingDirector = jsonData.credits.crew.find( (position) => {
                return position.job === "Director"
            })

            setDirector(findingDirector)
            
            setLoading(false)
        })
    }, [])



    return(
        loading ? <p> Loading </p> :
        <div>
            <h1>{movieDetails.title}</h1>
            <p>Summary: {movieDetails.overview}</p>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Tag Line: {movieDetails.tagline}</p>
            <p>Runtime: {movieDetails.runtime}</p>
            <p>Language: {movieDetails.original_language}</p>
            <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}>IMDB</a>
            <p>Budget: {movieDetails.budget}</p>
            <p>Revenue: {movieDetails.revenue}</p>
            <p>Director: {director.name}</p>
            <ul>
                {
                    movieDetails.credits.cast.slice(0,5).map( (actor) => {
                        return actor.name ? <li> {actor.name} </li> : null;
                    })
                }
            </ul>

            <ul>
                {
                    movieDetails.genres.map( (genre) => {
                        return genre.name ? <li>{genre.name}</li> : null;
                    })
                }
            </ul>

            <img 
                src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} 
                alt={`Movie poster for ${movieDetails.title}`} 
            />
            <img 
                src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} 
                alt={`Backdrop path for ${movieDetails.title}`} 
            />

            <FirebaseInteraction
                movieDetails={movieDetails}
            />

            <BackButton />

        </div> 
    ) 
}

export default MovieDetails;