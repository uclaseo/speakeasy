import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';

class Upload_Template extends Component {
  constructor(props) {
    super(props)
    this.state = {files: []}
    this.upload = this.upload.bind(this);
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
      images[index] = Math.floor(Math.random() * 10000) + file.name
    });
     axios.post(`/api/event/image/upload/geturl`, images)
    .then((response) => {
      let counter = 0;
      response.data.map((eachFile) => {
        axios.put(eachFile.url, this.state.files[counter])
        .then((awsResponse) => {
          counter++;
          this.registerImageUrl(eachFile);
        })
        counter++;
      })
    })
    .catch((error) => {
      console.log('error in upload', error);
    })
  }

  registerImageUrl(eachFile) {
    const imageData = {
      name: eachFile.fileName,
      imageLink: `https://s3-us-west-1.amazonaws.com/inseokspeakeasy/${eachFile.fileName}`,
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


  render() {
    return (
     <section>
        <div className="dropzone">
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
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, null)(Upload_Template);