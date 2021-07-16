import { useEffect, useState } from "react";
import FirebaseInteraction from "./FirebaseInteraction";


const MovieDetails = (props) => {
    const {movieID} = props.match.params;
    const movieURL = `https://api.themoviedb.org/3/movie/${movieID}`; // Accepts user query
    const apiKey = '9709355fc5ce17fa911605a13712678d';
    const [movieDetails, setMovieDetails] = useState([]);

    
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

        </div>
    )
}

export default MovieDetails;

// 07/15: 
    // For in loop to go through firebase's object of objects.
    // Display title on page
    // Put in own component that mounts on click of icon/button
    // Button to Remove from List AND firebase
    // Working title (Mockbuster, Not Blockbuster)

// 07/16: MVP FUNCTIONALITY COMPLETE! more time to sink in since no class
    // Adding display on page (Movie Title, Movie Poster, YouTube, Genres, Actors (3), Year, Runtime, Director)
    // Error handling when displaying more things on the page (e.g. director)
    // Randomizer Inside List
