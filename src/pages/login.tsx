import React, { useState, ChangeEvent } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const { BASE_URL } = process.env;

export default function login() {
  const [credential, setCredential] = useState({ email: '', password: '' });
  const Router = useRouter();

  const handleChange = ({ target }: {target: any}) => {
    const {name, value} = target;
    setCredential({ ...credential, [name]: value })
  }

  const handleSubmit = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email: credential.email,
      password: credential.password,
    })
    // console.log(res);
    
    if (res?.status === 200) {
      Router.push('/');
    }
  }

  return (
    <form>
      <input
        type="text"
        value={credential.email}
        onChange={ handleChange }
        name="email"
      />
      <input
        type="password"
        value={credential.password}
        onChange={ handleChange }
        name="password"
      />
      <button
        type='button'
        onClick={ handleSubmit }
      >
        Login
      </button>
    </form>
  )
}
