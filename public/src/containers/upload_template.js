import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';



class Upload_Template extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      screenshot: null,
      term: '',
      uploadedScreenshot: null
    }
    this.upload = this.upload.bind(this);
    this.capture = this.capture.bind(this);
    this.uploadScreenshot = this.uploadScreenshot.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  

  onDrop(acceptedFiles, rejectedFiles) {
    let array = this.state.files
    acceptedFiles.map(file => {
      array.push(file);
    })
    this.setState({
      files: array
    })
  }

  upload() {
    const images = {};
    
    this.state.files.map((file, index) => {
      images[index] = Math.floor(Math.random() * 100000) + file.name
    });
    console.log('images INSEOK:', images);

     axios.post(`/api/event/image/upload/geturl`, images)
    .then((response) => {
      let counter = 0;
      response.data.map((eachFile) => {
        axios.put(eachFile.url, this.state.files[counter])
        .then((awsResponse) => {
          counter++;
          this.registerImageUrl(eachFile);
        })
      })
    })
    .catch((error) => {
      console.log('error in upload', error);
    })
  }

  registerImageUrl(eachFile) {
    const imageData = {
      name: eachFile.fileName,
      imageLink: `https://s3-us-west-1.amazonaws.com/hrlaspeakeasy/${eachFile.fileName}`,
      userId: this.props.profile.id,
      eventId: 1
    };
    axios.post('/api/event/image/upload', imageData)
    .then((response) => {
      this.setState({
        files: []
      })
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture() {
    console.log('clicked');
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      screenshot: imageSrc
    })
    console.log(imageSrc);
  };

  uploadScreenshot() {
    const image = {
      image: this.state.screenshot,
      fileName: `${this.state.term}.jpg`
    };
    this.setState({
      term: ''
    });

    axios.post('/api/screenshot', image)
    .then((response) => {
      console.log('this is image link', response);
      this.setState({
        uploadedScreenshot: response.data
      })
    })
    .catch((error) => {
      console.log('error uploading screenshot', error);
    })


  }

  onInput(term) {
    this.setState({
      term: term
    });
  }
  render() {
    return (
     <section>
        <div className="dropzone text-center">
          <Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(file => <li key={file.name}>{file.name} - {file.size} bytes</li>)
            }
          </ul>
          <button onClick={this.upload}> upload </button>
        </aside>



        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
          {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
        <input 
          value={this.state.term}
          placeholder="screenshot name"
          onChange={event => this.onInput(event.target.value)}
        />
        <button onClick={this.uploadScreenshot}>upload screenshot</button>
        <h1>uploaded screenshot</h1>
        {this.state.uploadedScreenshot ? <img src={this.state.uploadedScreenshot} /> : null}
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    active_event: state.active_event
  }
}

export default connect(mapStateToProps, null)(Upload_Template);