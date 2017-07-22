<div className="container-fluid">
  <div className="row">
    <div className="col-md-4">
      <ul>
        <h3>Previous Event </h3>
        {this.state.userEvents.length > 0 ?
          this.state.userEvents.map((userEvent) => {
            return <li onClick={() => this.showEventPhotos(userEvent)}>{userEvent.event.eventName} </li>
          }) : null
        }
      </ul>
    </div>

    <div className="col-md-8">

      {this.state.photos ? this.state.photos.map((photo) => {
        return <div className="col-md-3"><img className="img-responsive" src={photo.imageLink} /></div>
      }) : null}

    </div>

  </div>
</div>