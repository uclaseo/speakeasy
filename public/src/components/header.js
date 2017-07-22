import React, { Component } from 'react'

let Header = ({label, renderPhoto}) => {
  return(
    <header className="intro">
    <div className="intro-body">
      <div className="container row col-md-8 col-md-offset-2">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h1 className="brand-heading">SPEAKEASY</h1>
            {renderPhoto ? renderPhoto() : null}
            <label>{label}</label>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header;