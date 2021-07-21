import willa from '../assets/willa.jpg'
import tmdbLogo from '../assets/tmdbLogo.svg'

import "../App.css"

const Footer = () => {
    return (
        <footer className="wrapper">
            <p> Created by: 
                <a href="https://www.ashwinsingh.dev/" target="_blank" rel="noopener noreferrer"> Ashwin</a>, 
                <a href="https://ericrichardson.ca/" target="_blank" rel="noopener noreferrer"> Eric</a>, and
                <a href="https://www.shaunms.com/" target="_blank" rel="noopener noreferrer"> Shaun</a>
            </p>
            <p>
                Supervised by: <a href={willa}  target="_blank" rel="noopener noreferrer">  Willa </a>
            </p>
            <div className="credits">
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                    <img 
                        src={tmdbLogo}
                        alt="The Movie Database Logo"/>
                </a>
            </div>

            
        </footer>
    )
}

export default Footer;