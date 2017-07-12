import React, { Component } from 'react';

class Home extends Component {
    render() {
    return (
      <div>

        <div className="jumbotron">
          <div className="container text-center">
            <h1>I'm changing stuff</h1>      
            <p>changing whatever yup what the fuck our application</p>
          </div>
        </div>
        <div className="container-fluid bg-3 text-center">    
          <div className="row">
            <div className="col-sm-3">
              <p>Some fuck fuck fuck..</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3"> 
              <p>HI fuck..</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3"> 
              <p>yo are you working? fuck you!!..</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
            <div className="col-sm-3">
              <p>Some what thelksdjfal hell..</p>
              <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
            </div>
          </div>
          <br />
          <br />
        <button type="button" className="btn btn-secondary btn-lg">Now the button says something else</button>
        </div>




      </div>
    )
  }
}

export default Home;
