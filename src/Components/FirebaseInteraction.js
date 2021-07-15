import firebase from "./firebase";

const FirebaseInteraction  = ({movieDetails}) => {
    const dbRef = firebase.database().ref();
    
    const sendToFirebase = () => {
        dbRef.push(movieDetails);
    }

    return (
        <button onClick={sendToFirebase}> Add to List </button>
    )
}

export default FirebaseInteraction;  
