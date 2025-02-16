import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// fd94b136
const API_URL = `https://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;
console.log('API Key:', import.meta.env.VITE_OMDB_API_KEY);


const App = () => {
  const [movies, setMovies] = useState([]);
  const[searchTerm,setSearchTerm]=useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Matrix");
  }, []);
  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value)}}
        onKeyDown={(e) => {e.key === 'Enter' && searchMovies(searchTerm)}}
        />
        <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {
      movies?.length > 0 
      ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          )
          )
          }
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
