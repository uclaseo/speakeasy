import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/header';

class previousEventPhotos extends Component {
  constructor(props){
    super(props);

    this.renderImages = this.renderImages.bind(this);
  }


  renderImages() {
    let images;
    console.log(this.props.photos);

    if (!this.props.photos.length) {
      return (
        <section>
          <div className="container content-section text-center">
            <div className="container text-center row col-md-8 col-md-offset-2 row">
                <h1>
                  no images
                  </h1>
            </div>
          </div>
        </section>
      )
    }
    images = this.props.photos.map((photo, index) => {
      return (
        <div key={index} className="event-detail">
          <li className="col-md-3">
             <img src={photo.imageLink} /> 
          </li>

        </div>
      )
    })

    return images;
  }
  

  render() {
    return (
      <div>
        <Header />

        <section id="portfolio">
          <div className="gallery">
            <ul>
              {this.renderImages()}
            </ul>
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