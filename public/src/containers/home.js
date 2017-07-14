import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import SimpleForm from './event_setting';

class Home extends Component {
  // submit(values){
  //   console.log("values in submit function", values);
  // }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>Speakeasy</h1>
            <p>Some info about our application</p>
          </div>
        </div>
        <div className="container-fluid bg-3 text-center">
          <div className="row">
            <div className="col-sm-3">
              <p>Some event..</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
            <div className="col-sm-3">
              <p>Some event..</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
            <div className="col-sm-3">
              <p>Some event...</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
            <div className="col-sm-3">
              <p>Some event...</p>
              <img
                src="https://placehold.it/150x80?text=IMAGE"
                className="img-responsive"
                style={{ width: '100%' }}
                alt="Image"
              />
            </div>
          </div>
          <br />
          <br />
          <Link to="/event_setting">
            <button
              type="button" className="btn btn-secondary btn-lg myBtns">Create Event
            </button>
          </Link>
          {/*<SimpleForm onSubmit = {this.submit}/>*/}
          {console.log(this.props)}
        </div>
      </div>
    );
  }
}




function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of BookList
  return {
    form: state.form
  }
}
export default connect(mapStateToProps)(Home)