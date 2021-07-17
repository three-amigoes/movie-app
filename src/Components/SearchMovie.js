import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import Ternary from "./Ternary";
import NoResults from "./NoResults";

const SearchMovie = (props) => {
    const {movieName} = props.match.params;
    const [searchResults, setSearchResults] = useState([]);
    const [loading, SetLoading] = useState(true)

    const searchURL = 'https://api.themoviedb.org/3/search/movie/'; //Returns popular movie, doesn't take user query.
    const apiKey = '9709355fc5ce17fa911605a13712678d';


    useEffect( () => {
        SetLoading(true)
        const url = new URL(searchURL);
        url.search = new URLSearchParams({
            api_key: apiKey,
            query: movieName,
            adult: false,
            // page: 1
        })
        fetch(url)
        .then( (rawData) => {
            return rawData.json();
        }).then( (jsonData) => {
            console.log(jsonData);
            setSearchResults(jsonData.results);
            SetLoading(false)
        })

    }, [movieName])

    return(
        loading ? <p> Loading </p> :

        <>
        {console.log(searchResults)}
            { 
            
            searchResults.length !== 0 ?

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
                                        : 
                                        <img 
                                                src="https://placekeanu.com/500/350" 
                                                alt={`Movie poster for ${movie.title}`} 
                                        />
                                    }
                                </Link>

                                <h2>{movie.title}</h2>
                                <Ternary input={movie.vote_average.toFixed(1)} category="Score: " ending="/10" />

                            </li>
                        )
                    })
                }
            </ul>

            : <NoResults /> 

            }
            
            <BackButton />
        </>
    )
}

export default SearchMovie;