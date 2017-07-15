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
    console.log('accepted : ', acceptedFiles)    
    console.log('acceptedFile[0].name', acceptedFiles[0].name)
    let array = this.state.files
    acceptedFiles.map(file => {
      array.push(file);
    })
    this.setState({
      files: array
    })
    console.log('array', array);
    console.log(this.state.files);
  }

  upload() {
    console.log('upload clicked');
    const images = {};
    this.state.files.map((file, index) => {
      images[index] = file.name
    });
    console.log(images);
    axios.post(`/api/event/image/upload/geturl`, images)
    .then((response) => {
      console.log('response in upload', response)
      let imageUrl = response.data;
      axios.put(imageUrl, this.state.files[0])
      .then(() => {
        this.registerImageUrl(imageUrl)
      })
    })
    .catch((error) => {
      console.log('error in upload', error);
    })
  }

  registerImageUrl(imageUrl) {
    const imageData = {
      name: 'whatever the fuck the file is',
      imageLink: imageUrl,
      userId: this.props.profile.id,
      eventId: 1
    };
    console.log('image data', imageData);
    axios.post('/api/event/image/upload', imageData)
    .then((response) => {
      console.log('response', response);
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