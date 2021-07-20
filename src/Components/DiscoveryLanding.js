import "../App.css"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import Footer from "./Footer";

const DiscoveryLanding = () => {
    const discoverURL = 'https://api.themoviedb.org/3/discover/movie/'; //Returns popular movie, doesn't take user query.
    const apiKey = 'a0e32a4a0c009553ac6020779811cc03';
    const [discoveryResults, setDiscoveryResults] = useState([])

    useEffect( () => {
        const url = new URL('https://proxy.hackeryou.com');
        url.search = new URLSearchParams({
            reqUrl: discoverURL,
            'params[api_key]': apiKey,
            'params[adult]': false
        });
        fetch(url)
        .then( (rawData) => {
        return rawData.json();
        }).then( (jsonData) => {
        setDiscoveryResults(jsonData.results);
        }) 
    }, [])


    return(
        <div className="wrapper">
            <h1 className="headerTitle"> Welcome to <span className="titleSpan"> NotBlockbuster</span> !</h1>
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
                        </li>
                        )
                    })
                }
            </ul>
            <Footer />
        </div>
    )
}

export default DiscoveryLanding;