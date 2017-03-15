import React from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';

const modalStyle = {
  content :{
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marignRight: '-50%',
    transform: 'translate(50%, 50%)'

  }
}

class SessionForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = { username: "", password: "", modalIsOpen: false };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.openModal();
    Modal.setAppElement('body');
 }

 componentDidUpdate() {
   if (this.props.loggedIn) {
     this.props.router.push("/");
   }
 }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.props.router.push("/");
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = { user: Object.assign({}, this.state) };
    this.props.processForm(user);
  }

  navLink() {
    if (this.props.formType === "login") {
      return <Link to="/signup">sign up instead</Link>;
    } else {
      return <Link to="/login">log in instead</Link>;
    }
  }

  renderErrors() {
    return(
      <ul>
        { this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>{ error }</li>
          ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="auth-form">
        <Modal isOpen={this.state.modalIsOpen}
          style={modalStyle}
          contentLabel="Modal"
          className="auth-form-modal" >
          <form onSubmit={this.handleSubmit} className="login-form-box">
            Welcome to PandaNote!
            <br/>
            Please {this.props.formType} or {this.navLink()}
            {this.renderErrors()}
            <div className="login-form">
              <br/>
              <label> Username:
                <input type="text"
                  value={this.state.username}
                  onChange={this.update("username")}
                  className="login-input" />
              </label>
              <br/>
              <label> Password:
                <input type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  className="login-input" />
              </label>
              <br/>
              <input className="button" type="submit" value="Submit" />
              <button className="button" onClick={this.closeModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default SessionForm;
