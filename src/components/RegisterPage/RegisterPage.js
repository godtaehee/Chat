import React from "react";
import "./styles.css";
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';


function RegisterPage() {

  const {register, watch, formState: {errors} } = useForm({mode: "onChange"});

  console.log(watch("email"))
  return (
    <div className="auth-wrapper">
      <div style={{textAlign: 'center'}}>
        <h3>Register</h3>
      </div>
      <form>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", {required: true, maxLength: 10})}
        />
        {console.log(errors)}
        {errors.email && <p>This field is required</p>}
        <label>Name</label>
        <input
          name="name"
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
        />
        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
        />
        <input type="submit"/>
      </form>
      <Link
        style={{
          color: 'gray',
          textDecoration: 'none',
        }}
        to="login">이미 아이디가 있다면...</Link>
    </div>
  )
}

export default RegisterPage;