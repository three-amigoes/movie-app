const NoResults = (props) => {
    props.props.setter(false);

    return(
        <div>
            <h2>No results found. Please try again.</h2>
        </div>
    )
}

export default NoResults; 