import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import './RegisterModal.css'
import { register } from "../../../redux/actions/authActions";
import { clearErrors } from "../../../redux/actions/errorActions";

const RegisterModal = ({ register, error, clearErrors }) => {

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

    //   static propTypes = {
    //       isAuthenticated: PropTypes.bool,
    //       error: PropTypes.object.isRequired
    //   }
    useEffect(() => {
      if(error) {
          if(error.id === "REGISTER_FAIL"){
              setMsg(error.msg.msg)
          } else {
              setMsg(null)
          }
      }
    }, [msg])

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password }
    register(newUser)
    // setModal(false);
  };

  return (
    <div className="RegisterModal">
      <div className="container">
        <button onClick={() => {
          setModal(!modal)
          clearErrors()
          }} className="btn btn-secondary">
          {!modal ? "Register" : "Close"}
        </button>

        {msg ? alert(`${msg}`): null}

        {modal ? (
          <div className="modal">
            <form onSubmit={onSubmit}>
              <h1>Register</h1>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter Item"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary">Register</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);



