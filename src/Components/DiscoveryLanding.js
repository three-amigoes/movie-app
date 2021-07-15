import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 

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
        <ul className="gallery">
            {
                discoveryResults.map( (movie) => {
                return(
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>{movie.original_title}</Link>
                    </li>
                    )
                })
            }
        </ul>
    )
}

export default DiscoveryLanding;