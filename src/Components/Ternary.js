const Ternary = (props) => {
    return(
        <>
        {
            props.input ? (<p> {props.category}{props.input}{props.ending}</p>) : null
        }
        </>
    )
}

export default Ternary;