import { useEffect, useState } from "react";
import FirebaseInteraction from "./FirebaseInteraction";
import { useHistory } from "react-router";


const MovieDetails = (props) => {
    const {movieID} = props.match.params;
    const movieURL = `https://api.themoviedb.org/3/movie/${movieID}`; // Accepts user query
    const apiKey = '9709355fc5ce17fa911605a13712678d';
    const [movieDetails, setMovieDetails] = useState([]);

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    }


    
    useEffect( () => {
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
        })
    }, [])

    return(
        <div>
            <h1>{movieDetails.title}</h1>
            <p>{movieDetails.overview}</p>
            <FirebaseInteraction
                movieDetails={movieDetails}
            />

            <button onClick={goToPreviousPath}>Go Back</button>

        </div>
    )
}

export default MovieDetails;