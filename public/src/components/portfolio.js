import React, { Component } from 'react'

let Portfolio = ({ renderEvents}) => {
  return (
    <section className="divCenter">
      <div className="portfolio ">
        <div className="gallery">
          <div className="row row-centered" >
            {renderEvents()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio;