import "../App.css"
import firebase from "../firebase";
import { useState, useEffect } from 'react'
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

const FavoriteList = (props) => {
    props.setter(true);

    const [fireBaseList, setFireBaseList] = useState([]);
    const [userRuntime, setUserRuntime] = useState(50);
    const [userGenre, setUserGenre] = useState('')
    const [copyOfFB, setCopyOfFB] = useState([]);

    // Sending items into Firebase. 
    // Returns array of object with fireBaseInfo & key
    useEffect( () => {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (response) => {
            const data = response.val()
            const pseudoFBList = []
            
            for (let key in data) {
                pseudoFBList.unshift({key: key, fireBaseInfo: data[key]} )
            }
            
            setFireBaseList(pseudoFBList)
            setCopyOfFB(pseudoFBList)
        })
    }, [])

    // Removing items from Firebase
    const removeFromList = (fireBaseItem) => {
        const dbRef = firebase.database().ref();
        dbRef.child(fireBaseItem).remove();
    }

    // Set copy of pseudoFBList in useEffect b/c it's originally variable to get FB to work
    // Every time userFormSubmit is called, sorts from a clean copy of pseudoFBList
    // Set approvedGenre to true if fb genre index = user genre, return to fbGenre
    // approvedGenre is gatekeeper for adding things into fbGenre
    const userFormSubmit = (event) => {
        event.preventDefault();

        const fbGenres = copyOfFB.filter( (movieObject) => {
            let approvedGenre = false;
            for (let index in movieObject.fireBaseInfo.genres){
                if(movieObject.fireBaseInfo.genres[index].id.toString() === userGenre){
                    approvedGenre = true;
                } else if(userGenre === ''){
                    approvedGenre = true;
                }
            }
            if(approvedGenre === true){
                return movieObject
            } else {
                return null
            }
        })

        // Filtered the fbGenre which is correctly filtered and returning movies that match user's run time request. 
        const filteredOptions = fbGenres.filter( (movie) => {
            return movie.fireBaseInfo.runtime <= userRuntime
        })
        setFireBaseList(filteredOptions)
    }



    return (
        <>
            <form className="wrapper filterForm" onSubmit={userFormSubmit}>
                
                <h2>Need help narrowing down your list? We can help!</h2>
                <div className="filterSlider">
                    <label className="sr-only" htmlFor="minutes">Minutes</label>
                    <p> I've got {userRuntime} Minutes </p>
                    <input type="range" name="minutes" id="minutes" min="30" max="180" step="5" onChange={(event) => setUserRuntime(event.target.value)} />
                </div>

                <label className="sr-only" htmlFor="filterGenre">Genres</label>
                <p>I feel like watching </p>
                <select onChange={(event) => setUserGenre(event.target.value)} name="genres" id="filterGenre" className="filterGenre">
                    <option value="">All</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Science Fiction</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                </select>
                <button className="filterButton" type="submit">Search</button>
            </form>

            <ul className="gallery wrapper">
                {
                    // Displaying Firebase items on the page.
                    fireBaseList.map( (item) => {
                        return(
                            <li key={item.key}>
                                <Link to={`/movie/${item.fireBaseInfo.id}`}>
                                    {
                                        item.fireBaseInfo.poster ?
                                            <img 
                                                src={`https://image.tmdb.org/t/p/original${item.fireBaseInfo.poster}`} 
                                                alt={`Movie poster for ${item.fireBaseInfo.title}`} 
                                            />
                                        : null
                                    }
                                </Link>

                                    <button className="removeButton" onClick={() => {removeFromList(item.key)}}> <span> &times; </span> </button>
                            </li>
                        )
                    })
                }
            </ul>

            <div className="searchBack wrapper">
                <BackButton />
            </div>  
        </>
    )
}

export default FavoriteList;