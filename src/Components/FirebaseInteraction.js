import firebase from "../firebase";
import { useState, useEffect } from "react";

const FirebaseInteraction  = ({movieDetails}) => {
    const dbRef = firebase.database().ref();
    const [found, setFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [keyFB, setKeyFB] = useState('');
    
    const sendToFirebase = () => {
        // const button = document.querySelector('.buttonFB')
        // button.style.display='none';
        dbRef.push({
            title: movieDetails.title,
            poster: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`,
            id: movieDetails.id,
            runtime: movieDetails.runtime,
            genres: movieDetails.genres,
            vote_average: movieDetails.vote_average
        });
        setFound(true)
        setLoading(true)
    }

    useEffect( () => {
        setLoading(true)
        dbRef.on('value', (snapshot) => {
            for (let movie in snapshot.val()){
                // console.log(snapshot.val()[movie]);
                const movieID = movieDetails.id;
                const snapshotID = snapshot.val()[movie].id;
                if (movieID === snapshotID){ 
                    setFound(true) 
                    setKeyFB(movie)
                }
            }
            setLoading(false)
        } )
        
    }, [movieDetails.id, dbRef])


    const removeFromList = (fireBaseItem) => {
        const dbRef = firebase.database().ref();
        dbRef.child(fireBaseItem).remove();
        setFound(false);
    }


    return (
        loading ? null :
        <>
            {
                found  
                ? 
                <button className="buttonFB" onClick={() => removeFromList(keyFB)}> Remove </button>
                : <button className="buttonFB" onClick={(sendToFirebase)}> Favourite </button>
            }
            
        </>
    )
}

export default FirebaseInteraction;  
