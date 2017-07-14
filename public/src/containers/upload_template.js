import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

export default class Upload_Template extends Component {
  constructor() {
    super()
    this.state = {files: []}
  }
  

  droppedFiles() {

  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('accepted : ', acceptedFiles)    
    console.log('rejected : ', rejectedFiles)
    console.log('acceptedFile[0].name', acceptedFiles[0].name)
    this.setState({
      files: acceptedFiles
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
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    )
  }
}
