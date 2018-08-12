import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header.js'
import  MovieRow from './components/MovieRow';
require('dotenv').config()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: false }
    this.searchHandler = this.searchHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.performSearch('a space odyssey')
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

                this.setState({ rows: movieRows, isLoading: false})
              }
              // use array to set state
            })
            .catch(error => console.warn(error))
  }

  searchHandler (e) {
    const searchTerm = e.target.value
    this.performSearch(searchTerm)
  }

  handleSubmit (e) {
    e.preventDefault();
    const searchTerm = e.target.value
    this.performSearch(searchTerm)
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <p className="loading">Loading ...</p>
    }
    return (
      <React.Fragment>
        <Header />
          <form onSubmit={this.handleSubmit} name="search" method="get" action="#">
            <input className="search" onChange={this.searchHandler} placeholder="Search movies..." />
          </form>
        <main className="main">
          {this.state.rows}
        </main>
      </React.Fragment>
    )
  }
}

export default App;

