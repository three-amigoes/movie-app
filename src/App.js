import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DiscoverDetails from './DiscoverDetails';

function App() {
  const discoverURL = 'https://api.themoviedb.org/3/discover/movie/'; //Returns popular movie, doesn't take user query.
  const searchURL = 'https://api.themoviedb.org/3/search/movie/'; // Accepts user query
  const apiKey = '9709355fc5ce17fa911605a13712678d';
  // const [userInput, searchUserInput] = useState('');
  const [discoveryResults, setDiscoveryResults] = useState([])
  
  useEffect( () => {
    const url = new URL(discoverURL);
    url.search = new URLSearchParams({
      api_key: apiKey,
      // query: 'pokemon',
      adult: false,
      // primary_release_year: 1999,
    })
    fetch(url)
    .then( (rawData) => {
      return rawData.json();
    }).then( (jsonData) => {
      setDiscoveryResults(jsonData.results);
      // console.log(jsonData)
      // console.log(jsonData.results);
    })
    // console.log(discoveryResults);
    
  }, [])


  return (
    <Router>
      <div className="App">
        <ul className="gallery">
          {
            discoveryResults.map( (movie) => {
              return(
                <li>
                  {movie.original_title}
                  
                </li>
              )
            })
          }
        </ul>
      </div>
    </Router>
  );
}

export default App;
