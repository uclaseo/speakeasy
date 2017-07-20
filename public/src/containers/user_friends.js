import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'


class User_Friends extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.fetchPossibleFriends(this.props.user_id)
  }


  render() {
    return (
      <div>
        User Friends
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.profile.id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPossibleFriends: fetchPossibleFriends
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(User_Friends)