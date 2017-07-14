import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class Upload_Template extends Component {
  constructor() {
    super()
    this.state = {files: []}
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
              this.state.files.map(file => <li>{file.name} - {file.size} bytes</li>)
            }
          </ul>
          <button> upload </button>
        </aside>
      </section>
    )
  }
}
