import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'


//Used v4 of TMDB API Key
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // This should be your v4 Read Access Token

const API_Options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};


const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);


  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
      setIsLoading(true);
      setErrorMessage('');
    try {
      //Conditional rendering
        const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_Options); // <--- Keep API_Options here

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData); // Log the full error from TMDb
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.status_message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      } 
    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage(error.message || 'Error while fetching Movies, try again later!');
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }
  //searchTerm is passed as dependancy array
  //Whenever it changes useEffect will be called
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner"></img>
          <h1>Find <span className="text-gradient">Movies</span> That You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {/*Conditional rendering is used here within {}
          Means rendering based upon certain condion
          expression ? ifTrue : ifFalse*/}
          {
          isLoading ? (<Spinner/>) :
            errorMessage ? (<p className="text-red-500">{errorMessage}</p>) : (
              <ul>
                {movieList.map((movie) => (
                 <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )
          }
        </section>
      </div>
    </main>
  );
};

export default App;