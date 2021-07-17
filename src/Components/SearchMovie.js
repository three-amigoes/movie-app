import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Ternary from "./Ternary";

const SearchMovie = (props) => {
    const {movieName} = props.match.params;
    const [searchResults, setSearchResults] = useState([]);

    const searchURL = 'https://api.themoviedb.org/3/search/movie/'; //Returns popular movie, doesn't take user query.
    const apiKey = '9709355fc5ce17fa911605a13712678d';


    useEffect( () => {
        const url = new URL(searchURL);
        url.search = new URLSearchParams({
            api_key: apiKey,
            query: movieName,
            adult: false,
        })
        fetch(url)
        .then( (rawData) => {
            return rawData.json();
        }).then( (jsonData) => {
            console.log(jsonData.results)
            setSearchResults(jsonData.results);
        })
    }, [movieName])

    return(
        <>
            <ul>
                {
                    searchResults.map( (movie) => {
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

                                <h2>{movie.title}</h2>
                                <Ternary input={movie.vote_average.toFixed(1)} category="Score: " ending="/10" />

                            </li>
                        )
                    })
                }
            </ul>
            
            <BackButton />
        </>
    )
}

export default SearchMovie;