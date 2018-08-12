import React, { Component } from 'react';
import PropTypes from 'prop-types'

class MovieRow extends Component {

  viewMovie() {
    const singleUrl = `https://www.themoviedb.org/movie/${this.props.movie.id}`
    window.location.href = singleUrl
  }
  render() {
    return (
      <article className="movieRow" key={this.props.movie.id}>
        <article className="column">
        <img src={this.props.movie.poster_src ? this.props.movie.poster_src : 'N/A '} alt={`${ this.props.movie.title } Movie Poster`}/>
        </article>
        <article className="column">
        <h3>{this.props.movie.title}</h3>
        <p>{this.props.movie.overview}</p>
        <input onClick={this.viewMovie.bind(this)} type="button" value="view"/>
        </article>
      </article>
    )
  }
}

MovieRow.propTypes = {movie: PropTypes.object}

export default MovieRow;