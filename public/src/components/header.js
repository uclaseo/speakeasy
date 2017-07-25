import React, { Component } from 'react'

class Header extends Component {

  renderHeading() {
    let heading;

    if (this.props.brand) {
      heading =  <h1 className="brand-heading">{this.props.brand}</h1>
    } else if (this.props.renderPhoto) {
      heading = this.props.renderPhoto()
    }
    return heading;
  }


  render() {
    return (
      <header className="intro">
        <div className="intro-body">
          <div className="container row col-md-8 col-md-offset-2">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                {this.renderHeading()}
                <label>{this.props.label}</label>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;