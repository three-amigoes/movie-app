import { useHistory } from 'react-router';

const BackButton = () => {
    let history = useHistory();

    const goToPreviousPath = () => {
        history.goBack();
    };


    return(
        <button onClick={goToPreviousPath}> Back </button>
    )
}

export default BackButton;