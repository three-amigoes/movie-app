import firebase from "./firebase";
import { useState, useEffect } from 'react'

const FavoriteList = () => {
    const dbRef = firebase.database().ref();
    const [fireBaseList, setFireBaseList] = useState([]);
    
    useEffect( () => {
        dbRef.on('value', (response) => {
            const data = response.val()
            const pseudoFBList = []
            
            for (let key in data) {
                pseudoFBList.push({key: key, fireBaseInfo: data[key]} )
            }

            console.log(pseudoFBList);
            setFireBaseList(pseudoFBList)
        })
    }, [])


    
    return (
        <ul>
            {
                fireBaseList.map( (item) => {
                    return(
                        <li>{item.fireBaseInfo.title}</li>
                    )
                })
            }
        </ul>
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