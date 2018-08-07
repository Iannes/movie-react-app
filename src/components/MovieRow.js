import React, { Component } from 'react';

class MovieRow extends Component {
  render() {
    return (
      <section className="movieRow" key={this.props.movie.id}>
        <article className="column">
          <img src={this.props.movie.poster_src} alt="Movie Poster"/>
        </article>
        <article className="column">
        <h2>{this.props.movie.title}</h2>
          <p>{this.props.movie.overview}</p>
        </article>
      </section>
    )
  }
}

export default MovieRow;