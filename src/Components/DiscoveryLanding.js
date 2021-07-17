import "../App.css"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import Ternary from "./Ternary";

const DiscoveryLanding = () => {
    const discoverURL = 'https://api.themoviedb.org/3/discover/movie/'; //Returns popular movie, doesn't take user query.
    const apiKey = '9709355fc5ce17fa911605a13712678d';
    const [discoveryResults, setDiscoveryResults] = useState([])

    useEffect( () => {
        const url = new URL(discoverURL);
        url.search = new URLSearchParams({
        api_key: apiKey,
        // query: 'pokemon',
        adult: false,
        // primary_release_year: 1999,
        })
        fetch(url)
        .then( (rawData) => {
        return rawData.json();
        }).then( (jsonData) => {
        setDiscoveryResults(jsonData.results);
        console.log(jsonData.results);
        })        
    }, [])


    return(
        <ul className="gallery wrapper">
            {
                discoveryResults.map( (movie) => {
                return(
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            {
                                movie.poster_path ?
                                    <img 
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                                        alt={`Movie poster for ${movie.title}`} 
                                    />
                                : null
                            }
                        </Link>

                        <h2>{movie.original_title}</h2>
                        <Ternary input={movie.vote_average.toFixed(1)} category="Score: " ending="/10"/>

                    </li>
                    )
                })
            }
        </ul>
    )
}

export default DiscoveryLanding;