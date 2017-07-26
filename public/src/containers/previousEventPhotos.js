import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Portfolio from '../components/portfolio';

class previousEventPhotos extends Component {
  constructor(props) {
    super(props);

    this.renderImages = this.renderImages.bind(this);
  }

  renderMessage() {
    let msg;
    if (this.props.photos.length) {
      msg = 'EVENT IMAGES';
    } else {
      msg = 'NO EVENT IMAGES YET';
    }
    return (
      <div className="">
        <h2>{msg}</h2>
      </div>
    );
  }

  renderImages() {
    let images;
    if (this.props.photos.length) {
      images = this.props.photos.map((photo, idx) => {
        return (
            <li className="col-md-3">
              <img src={photo.imageLink} />
            </li>
        )
      })
    }
    return images;
  }


  render() {

    return (
      <div>
        <Header
          brand="SPEAKEASY"
        />

        <section>
          <div className="container content-section text-center">
            <div className="container text-center row col-md-8 col-md-offset-2">
              {this.renderMessage()}
            </div>
          </div>
        </section>
        <section>
          <div className="container-fluid">
            <Portfolio
              renderEvents={this.renderImages}
            />
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    photos: state.active_previous_event
  }
}

export default connect(mapStateToProps)(previousEventPhotos)