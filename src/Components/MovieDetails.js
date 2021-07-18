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
    const [cast, setCast] = useState([])
    const [genres, setGenres] = useState([])
    
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
            // console.log(jsonData)
            setMovieDetails(jsonData)

            // Finding Director Object within Crew Array
            const findingDirector = jsonData.credits.crew.find( (position) => {
                    return position.job === "Director"
            })
            findingDirector === undefined ? setDirector('') : setDirector(findingDirector)

            // Turning Cast Array returned from API to display on page using join
            const castArray = [];
            jsonData.credits.cast.slice(0,5).forEach( (actor) => {
                castArray.push(actor.name)
            })
            setCast(castArray);

            // Turning Genres Array returned from API to display on page using join
            const genresArray = [];
            jsonData.genres.forEach( (genre) => {
                genresArray.push(genre.name)
            })
            setGenres(genresArray);

            // Set loading to false after API is called to prevent rest of code of running preemptively.
            setLoading(false)
        })
    }, [movieID])



    return(
        loading ? <p> Loading </p> :
        <div className="movieGrid wrapper">
            <div className="leftColumn">
                {
                    movieDetails.poster_path ?
                        <img 
                            className="poster"
                            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} 
                            alt={`Movie poster for ${movieDetails.title}`} 
                        />
                    : <img 
                            src="https://placekeanu.com/500/350"
                            alt={`Movie poster for ${movieDetails.title}`} 
                        />
                }

                <div className="leftColumnButtons">
                    <FirebaseInteraction
                        movieDetails={movieDetails}
                    />

                    <BackButton />
                </div>
            </div>



            <div className="rightColumn">     
                <div className="titleRow">
                        {movieDetails.imdb_id 
                        ? <h1 className="title"><a className="imdb" href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}>{movieDetails.title}</a></h1>
                        : <h1 className="title">{movieDetails.title}</h1>}
                    <Ternary className="runtime" input={movieDetails.runtime} category="Runtime: " ending=" minutes" />
                </div>

                <div className="releaseRow">
                    <Ternary className="tagline" input={movieDetails.tagline} />
                    <Ternary className="releaseDate" input={movieDetails.release_date} category="Released: " />
                </div>

                <Ternary className="overview" input={movieDetails.overview} />

                <Ternary className="director" input={director.name} category="Director: " />

                {
                    movieDetails.credits.cast     
                    ? <p className="cast">Cast: {cast.join(", ")}</p>         
                    : null
                }

                {
                    movieDetails.genres 
                    ? <p className="genres">Genres: {genres.join(", ")}</p>
                    : null
                }

                { movieDetails.videos.results[0] 
                    ? <ReactPlayer className="youTube" width="100%" height="57%" url={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`} />
                    : null
                }

            </div>


            
            {/* <Ternary input={movieDetails.original_language.toUpperCase()} category="Language: " /> */}
            {/* <Ternary input={movieDetails.budget} category="Budget: $" /> */}
            {/* <Ternary input={movieDetails.revenue} category="Revenue: $" /> */}
            










            {/* {
                movieDetails.backdrop_path ?
                    <img 
                        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} 
                        alt={`Backdrop path for ${movieDetails.title}`} 
                    />
                : null
            } */}

           

        </div> 
    ) 
}

export default MovieDetails;