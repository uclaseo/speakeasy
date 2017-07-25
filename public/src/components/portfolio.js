import React, { Component } from 'react'

let Portfolio = ({ renderEvents}) => {
  return (
    <section className="divCenter">
      <div className="portfolio ">
        <div className="gallery">
          <ul >
            {renderEvents()}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Portfolio;