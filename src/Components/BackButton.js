import { useHistory } from 'react-router';

const BackButton = () => {
    let history = useHistory();

    const goToPreviousPath = () => {
        history.goBack();
    };


    return(
        <button className="backButton" onClick={goToPreviousPath}><span class="iconify" data-icon="fluent:rewind-20-filled" data-inline="false"></span> Back</button>
    )
}

export default BackButton;