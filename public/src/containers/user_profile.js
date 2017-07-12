import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class User_Profile extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;

    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input className="form-control"
        type="text"
        {...field.input} />
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log('values:', values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

        <button type="submit" className="btn btn-secondary btn-lg">
          Submit
        </button>
      </form>
    );
  }
}

function validate(values) {
  const error = {};

  if (!values.name) {
    error.name = 'Enter your name';
  }

  if (!values.handle) {
    error.handle = 'Enter your handle';
  }

  if (!values.email) {
    error.email = 'Enter your email';
  }

  if (!values.password) {
    error.password = 'Enter your password';
  }

  return error;
}

export default reduxForm({
  validate: validate,
  form: 'ProfileForm;'
})(User_Profile);

//
