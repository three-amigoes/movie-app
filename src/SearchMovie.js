import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const SearchMovie = (props) => {
    const {movieName} = props.match.params
    const [searchResults, setSearchResults] = useState([])
    // console.log(props.match.params.movieName);

    const searchURL = 'https://api.themoviedb.org/3/search/movie/'; //Returns popular movie, doesn't take user query.
    const apiKey = '9709355fc5ce17fa911605a13712678d';


    useEffect( () => {
        const url = new URL(searchURL);
        url.search = new URLSearchParams({
        api_key: apiKey,
        query: movieName,
        adult: false,
        // primary_release_year: 1999,
        })
        fetch(url)
        .then( (rawData) => {
        return rawData.json();
        }).then( (jsonData) => {
        setSearchResults(jsonData.results);
        // console.log(jsonData.results);
        })        
    }, [])

    return(
        <ul>
            {
                searchResults.map( (movie) => {
                    return(
                        <li key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>{movie.original_title}</Link>
                        </li>
                    )
                })
                // <h1>{props.match.params.movieName}</h1>

            }
        </ul>
    )
}

export default SearchMovie;