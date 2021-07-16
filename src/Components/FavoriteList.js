import firebase from "./firebase";
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const FavoriteList = () => {
    const dbRef = firebase.database().ref();
    const [fireBaseList, setFireBaseList] = useState([]);
    
    // Sending items into Firebase. 
    // Returns array of object with fireBaseInfo & key
    useEffect( () => {
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
        dbRef.child(fireBaseItem).remove();
    }

        // Go back button 
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    }

    return (
        <>
            <ul>
                {
                    // Displaying Firebase items on the page.
                    fireBaseList.map( (item) => {
                        return(
                            <li>
                                {item.fireBaseInfo.title}
                                {/* Looking for key and then removing object */}
                                <button onClick={() => {removeFromList(item.key)}}>Remove</button>
                            </li>
                        )
                    })
                }
            </ul>

            <button onClick={goToPreviousPath}>Go Back</button>
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