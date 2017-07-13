
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios' 
// You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop
//https://github.com/erikras/redux-form/issues/2095

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name = "eventName"
           component = "input"    //could be string, field, textarea
           type = "text"
           placeholder = "eventName"
        />
        <br></br>
        <Field name="password"
              component = "input"
              type =  "password"
              placeholder = "Password"
        />
        <br></br>
        <Field name = "latitude"
              component = "input"    //could be string, field, textarea
              type = "text"
              placeholder = "latitude"
        />
        <br></br>
        <Field name = "longitude"
              component = "input"    //could be string, field, textarea
              type = "text"
              placeholder = "longitude"
        />
        
        <br></br>
        <Field name = "isLive"
              component = "input"    //could be string, field, textarea
              type = "text"
              placeholder = "isLive"
        />
        <br></br>
      
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
  onSubmit :(values) =>{
    console.log("i am here",values)
    axios.post('/api/event/create', {
      eventName: values.eventName,
      password: values.password,
      latitude: values.latitude,
      longitude: values.longitude,
      isLive: values.isLive
    })
  }
})(SimpleForm)