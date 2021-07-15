import firebase from "./firebase";

const FavoriteList = () => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (data) => {
        console.log(data.val());
    })
    

    return(
        <div>
            
        </div>
    )
}

export default FavoriteList;