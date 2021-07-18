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
        adult: false,
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
        <div>
            <h1> Welcome to <span className="titleH1"> NotBlockbuster</span> !</h1>
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

                            <div className="movieCardText">
                                {/* <h2>{movie.title}</h2> */}
                                {/* <Ternary input={movie.vote_average.toFixed(1)} ending="/10"/> */}
                            </div>

                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DiscoveryLanding;