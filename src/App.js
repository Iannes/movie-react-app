import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header.js'
import { Input } from './components/Input';
import  MovieRow from './components/MovieRow';
require('dotenv').config()

class App extends Component {
  constructor(props) {

    super(props)
    this.performSearch()
    this.state = {}

  }

  performSearch() {

    const api_key = process.env.REACT_APP_API_KEY
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=Fight+Club`

    return fetch(url)
            .then(data => data.json())
            .then(result => {
              const results = result.results
              // create array where we'll store each row
              const movieRows = []
              // map throught results
              results.map(movie => {
                 movie.poster_src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                // pass movie props
                const movieRow = <MovieRow key={movie.id} movie = {movie} />
                // push into array
                return movieRows.push(movieRow)
              })
              // use array to set state
              this.setState({ rows: movieRows})
            })
            .catch(error => console.warn(error))
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Input />
        <main className="main">
          {this.state.rows}
        </main>
      </React.Fragment>
    )
  }
}

export default App;
