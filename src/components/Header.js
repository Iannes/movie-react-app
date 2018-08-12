import React from 'react'
import PropTypes from 'prop-types'

export const  Header = (props) => {

    return (
      <header>
        <article className="header-inner">
          <img width="75"src="images/logo.svg" alt="Movie Database Logo"/>
          <h2>{ props.title }</h2>
        </article>
      </header>
    )
}
Header.propTypes = {title: PropTypes.string}
Header.defaultProps = { title: 'Movie DB Search' };