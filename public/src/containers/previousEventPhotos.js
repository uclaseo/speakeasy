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
      msg = 'NO EVENT IMAGES';
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
          <div key={idx} className="event-detail">
            <li>
              <img src={photo.imageLink} />
            </li>

          </div>
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

        <Portfolio
          renderEvents={this.renderImages}
        />
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