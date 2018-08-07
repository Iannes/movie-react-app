import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header.js'
import  MovieRow from './components/MovieRow';
require('dotenv').config()

class App extends Component {
  constructor(props) {

    super(props)
    this.performSearch('wonder')
    this.state = {}
    this.searchHandler = this.searchHandler.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  performSearch(searchTerm) {

    const api_key = process.env.REACT_APP_API_KEY
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}`

    return fetch(url)
            .then(data => data.json())
            .then(result => {
              const results = result.results
              // create array where we'll store each row
              const movieRows = []
              // map throught results
              if(results) {
                results.map(movie => {
                  if(movie.poster_path){
                    movie.poster_src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                  } else {
                    movie.poster_src = ''
                  }
                  // pass movie props
                  const movieRow = <MovieRow key={movie.id} movie = {movie} />
                  // push into array
                  return movieRows.push(movieRow)
                })
              }
              if(movieRows ) {

                this.setState({ rows: movieRows})
              }
              // use array to set state
            })
            .catch(error => console.warn(error))
  }

  searchHandler (e) {
    const searchTerm = e.target.value
    this.performSearch(searchTerm)
  }

  handleKeyPress (e) {
    const searchTerm = e.target.value
    if (e.key === 'Enter') {
      this.performSearch(searchTerm)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <input className="search" onChange={this.searchHandler} onKeyPress={this.handleKeyPress} placeholder="Search movies..." />
        <main className="main">
          {this.state.rows}
        </main>
      </React.Fragment>
    )
  }
}

export default App;
