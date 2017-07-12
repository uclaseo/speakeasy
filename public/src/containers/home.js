import React, { Component } from 'react';

class Home extends Component {
    render() {
    return (
      <div>

        <div className="jumbotron">
          <div className="container text-center">
            <h1>Speakeasy</h1>      
            <p>Some stuff stuff about our application</p>
          </div>
        </div>
        <div className="container-fluid bg-3 text-center">    
          <div className="row">
            <div className="col-sm-3">
              <p>Some testing on..</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3"> 
              <p>Some event..</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3"> 
              <p>Some event...</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3">
              <p>Some event...</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
          </div>
          <br />
          <br />
        <button type="button" className="btn btn-secondary btn-lg">Create Event</button>
        </div>




      </div>
    )
  }
}

export default Home;
