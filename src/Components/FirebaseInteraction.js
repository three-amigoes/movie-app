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
            id: movieDetails.id
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
        
    }, [])


    return (
        loading ? null :
        <>
            {
                found  
                ? <p> Already in List! </p> 
                : <button class="buttonFB" onClick={sendToFirebase}> Add to List </button>
            }
            
        </>
    )
}

export default FirebaseInteraction;  
