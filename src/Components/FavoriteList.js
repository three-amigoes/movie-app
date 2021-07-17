import firebase from "../firebase";
import { useState, useEffect } from 'react'
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

const FavoriteList = () => {
    const [fireBaseList, setFireBaseList] = useState([]);
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

            // console.log(pseudoFBList);
            setFireBaseList(pseudoFBList)
        })
    }, [])

    // Removing items from Firebase
    const removeFromList = (fireBaseItem) => {
        const dbRef = firebase.database().ref();
        dbRef.child(fireBaseItem).remove();
    }

    return (
        <>
        {console.log(fireBaseList)}
            <ul>
                {
                    // Displaying Firebase items on the page.
                    fireBaseList.map( (item) => {
                        return(
                            <li key={item.key}>
                                {item.fireBaseInfo.title}

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




                                {/* Looking for key and then removing object */}
                                <button onClick={() => {removeFromList(item.key)}}>Remove</button>
                            </li>
                        )
                    })
                }
            </ul>

            <BackButton />
        </>
    )
}

export default FavoriteList;

    // const [fbList, setFbList] = useState([])
    // const dbRef = firebase.database().ref();
    
    // useEffect( () => {
    //     dbRef.on('value', (data) => {
    //         setFbList(data.val());
    //         console.log(data.val());
    //     })
    // }, [])