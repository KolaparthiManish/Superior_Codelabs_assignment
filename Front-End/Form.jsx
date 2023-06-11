import React, { useState } from 'react';
import "./Form.css";

function Form() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    userPassword: ""
  };


  const [user, setUser] = useState(initialState);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if(data.msg)
        alert("success")
        // Reset the form fields
        console.log(data)
        setUser(initialState);
      })
      .catch(error => alert(error));
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <label>First Name</label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />
          <label>Last Name</label>
          <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleInputChange} />
          <label>Password</label>
          <input type="password" name="userPassword" value={user.userPassword} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
