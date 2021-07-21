import "../App.css"
import poster from '../assets/poster.png'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import NoResults from "./NoResults";

const SearchMovie = (props) => {
    props.setter(false);

    const {movieName} = props.pathway.match.params;
    const [searchResults, setSearchResults] = useState([]);
    const [loading, SetLoading] = useState(true)
    const [searchExists, setSearchExists] = useState(false)

    const searchURL = 'https://api.themoviedb.org/3/search/movie/'; //Returns popular movie, doesn't take user query.
    const apiKey = 'a0e32a4a0c009553ac6020779811cc03';


    useEffect( () => {
        SetLoading(true)
        const url = new URL('https://proxy.hackeryou.com');
        url.search = new URLSearchParams({
            reqUrl: searchURL,
            'params[api_key]': apiKey,
            'params[query]': movieName,
            'params[adult]': false,
        })
        fetch(url)
        .then( (rawData) => {
            return rawData.json();
        }).then( (jsonData) => {
            jsonData.errors ? setSearchExists(false) : setSearchExists(true);
            setSearchResults(jsonData.results);
            SetLoading(false)
        })
    }, [movieName])

    return(
        loading ? <p className="loading wrapper"> Loading </p> :

        searchExists === false ? <NoResults /> :
        
        <>  
            { 

            searchResults.length !== 0  ?
            
            <ul className="gallery wrapper">
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
                                        <>
                                            <img 
                                                src={poster}
                                                alt={`No poster available for ${movie.title}`}
                                            />
                                            <div className="noPosterTitle">
                                                <h2>{movie.title}</h2>
                                            </div>
                                        </>
                                    }
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            : <NoResults props={props} /> 

            }
            
            <div className="searchBack wrapper">
                <BackButton />
            </div>  
        </>
    )
}

export default SearchMovie;