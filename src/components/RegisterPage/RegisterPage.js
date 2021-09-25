import React, { useRef, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@firebase/auth';

import { getDatabase, ref, child, set } from '@firebase/database';
import md5 from 'md5';

function RegisterPage() {
  // Hooks
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Firebase
  const auth = getAuth(firebase);
  const database = getDatabase(firebase);

  console.log(database);
  // ETC
  const password = useRef();
  password.current = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(createdUser.user, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      // Database 오류부분!!
      await ref(database, 'user').child(ref, createdUser.user.uid).set({
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });

      setLoading(false);
    } catch (e) {
      setErrorFromSubmit(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This field is required</p>}

        <label>Name</label>
        <input
          name="name"
          {...register('name', { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === 'required' && (
          <p>This name field is required</p>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <p>Your input exceed maxium length</p>
        )}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />

        {errors.password && errors.password.type === 'required' && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>Password must have at least 6 characters</p>
        )}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register('password_confirm', {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === 'required' && (
            <p>This password_confirm field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === 'validate' && (
            <p>The password do not match</p>
          )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}

        <input type="submit" disabled={loading} />
      </form>
      <Link
        style={{
          color: 'gray',
          textDecoration: 'none',
        }}
        to="login"
      >
        이미 아이디가 있다면...
      </Link>
    </div>
  );
}

export default RegisterPage;
