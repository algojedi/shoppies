import React from 'react';
import './App.css';
import { Nominations } from './features/nominations/Nominations';
import SearchBar from './components/search-bar/search-bar';
import { MovieResults } from './features/movie-results/MovieResults';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Nominations />
      <MovieResults />
    </div>
  );
}

export default App;
