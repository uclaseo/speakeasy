import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class User_Profile extends Component {
  renderField(field) {
    return (
      <div className="form-control">
        <label>
          {field.label}
        </label>
        <input {...field.input} />
      </div>
    );
  }

  render() {
    return (
      <form>
        <Field
          label="Name"
          name="name"
          type="text"
          component={this.renderField}
        />

        <Field
          label="Handle"
          name="handle"
          type="text"
          component={this.renderField}
        />

        <Field
          label="Email"
          name="email"
          type="text"
          component={this.renderField}
        />

        <Field
          label="Password"
          name="password"
          type="text"
          component={this.renderField}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'ProfileForm'
})(User_Profile);
