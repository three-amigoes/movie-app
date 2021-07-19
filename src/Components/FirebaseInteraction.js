import firebase from "../firebase";
import { useState, useEffect } from "react";

const FirebaseInteraction  = ({movieDetails}) => {
    const dbRef = firebase.database().ref();
    const [found, setFound] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const sendToFirebase = () => {
        const button = document.querySelector('.buttonFB')
        button.style.display='none';
        dbRef.push({
            title: movieDetails.title,
            poster: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`,
            id: movieDetails.id,
            runtime: movieDetails.runtime,
            genres: movieDetails.genres,
            vote_average: movieDetails.vote_average
        });
    }


    useEffect( () => {
        setLoading(true)
        dbRef.on('value', (snapshot) => {
            for (let movie in snapshot.val()){
                const movieID = movieDetails.id;
                const snapshotID = snapshot.val()[movie].id;
                if (movieID === snapshotID){ setFound(true) }
            }
            setLoading(false)
        } )
        
    }, [movieDetails.id, dbRef])


    return (
        loading ? null :
        <>
            {
                found  
                ? <p className="alreadyAdded">  Favourited! </p> 
                : <button className="buttonFB" onClick={sendToFirebase}> &#9733; Add to Favourite </button>
            }
            
        </>
    )
}

export default FirebaseInteraction;  
