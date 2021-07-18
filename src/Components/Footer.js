import willa from '../assets/willa.jpg'
import "../App.css"

const Footer = () => {
    return (
        <footer className="wrapper">
            <p> Created by 
                <a href="https://www.ashwinsingh.dev/" target="_blank" rel="noopener noreferrer"> Ashwin</a>, 
                <a href="https://ericrichardson.ca/" target="_blank" rel="noopener noreferrer"> Eric</a>, and
                <a href="https://www.shaunms.com/" target="_blank" rel="noopener noreferrer"> Shaun</a>  |    
                Supervised by: <a href={willa}  target="_blank" rel="noopener noreferrer">  Willa </a>
            </p>


            
        </footer>
    )
}

export default Footer;