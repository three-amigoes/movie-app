import { useEffect, useState } from "react";
import FirebaseInteraction from "./FirebaseInteraction";
import ReactPlayer from 'react-player/youtube'
import BackButton from "./BackButton";
import Ternary from "./Ternary";
import poster from "../assets/poster.png"

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
        loading ? <p className="wrapper loading"> Loading </p> :
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
                            src={poster}
                            alt={`No poster available for ${movieDetails.title}`} 
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
                {movieDetails.imdb_id 
                ? <h1 className="title"><a className="imdb" href={`https://www.imdb.com/title/${movieDetails.imdb_id}`} target="_blank" rel="noopener noreferrer">{movieDetails.title}</a></h1>
                : <h1 className="title">{movieDetails.title}</h1>}

                
                <Ternary className="runtime" input={movieDetails.runtime} ending=" minutes" category="Runtime: "/>   

                <Ternary className="tagline" input={movieDetails.tagline} />

                <Ternary className="overview" input={movieDetails.overview} />

                <Ternary className="releaseDate" input={movieDetails.release_date} category="Released: " />

                <Ternary className="director" input={director.name} category="Director: " />

                {
                    movieDetails.credits.cast.length  
                    ? <p className="cast">Cast: {cast.join(", ")}</p>         
                    : null
                }

                {
                    movieDetails.genres.length
                    ? <p className="genres">Genres: {genres.join(", ")}</p>
                    : null
                }

                { movieDetails.videos.results[0] 
                    ? <ReactPlayer className="youTube2" controls="true" width="100%" height="100%" url={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`} />
                    : null
                }


            </div>
            
                { movieDetails.videos.results[0] 
                    ? <ReactPlayer className="youTube" controls="true" width="100%" height="100%" url={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`} />
                    : null
                }
        </div> 
    ) 
}

export default MovieDetails;