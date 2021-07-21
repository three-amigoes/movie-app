const Ternary = (props) => {
    return(
        <>
            {
                props.input ? (<p className={props.className}> {props.category}{props.input}{props.ending}</p>) : null
            }
        </>
    )
}

export default Ternary;