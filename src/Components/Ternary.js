const Ternary = (props) => {
    return(
        <>
        {
            props.input ? (<p> {props.category}{props.input}</p>) : null
        }
        </>
    )
}

export default Ternary;