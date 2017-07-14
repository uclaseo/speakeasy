import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class Upload_Template extends Component {
  constructor() {
    super()
    this.state = {files: []}
    this.upload = this.upload.bind(this);
  }
  

  droppedFiles() {

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
    axios.post(`/api/event/image/upload`, images)
    .then((response) => {
      console.log('response in upload', response)

      axios.put(`${response.data}`, this.state.files[0])
    })
    .catch((error) => {
      console.log('error in upload', error);
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
