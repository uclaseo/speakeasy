return (
  <div>
    {(this.state.showPasswordInput) ?
      <div>
        Please EnterPassword:
            <form onSubmit={this.submitPasswordForm}>
          <input type="text"
            name="eventpassword"
            value={this.state.passwordInput}
            onChange={this.handlePasswordChange}
          />
          <br></br>
          <input type="submit" value="Submit" />
          <input type="button" value="Return to Home" onClick={this.redirectHome} />
        </form>
        <div ref={(el) => this.messagesEnd = el} />
      </div>
      : null}

    {this.state.showChat ?
      <div>
        {closeEvent}
        <ChatLog
          roomMessages={this.props.messages}
          dmClick={this.handleDMClick}
        />
        {this.state.isInput ? null : <div>please enter text</div>}

        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.text}
          onKeyPress={this.handleKeyPress}
        />
        
        <button type="button" onClick={this.handleSendClick}>
          Send
            </button>
        <input type="file" id="fileinput" multiple="multiple" accept="image/*"
          onChange={(event) => this.handleUpload(event)} />
        {this.renderImagePreview()}
      </div>
      : null}
    <div ref={(el) => this.messagesEnd = el} />
  </div>
);