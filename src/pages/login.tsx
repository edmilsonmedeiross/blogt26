import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const [credential, setCredential] = useState({ email: '', password: '' });
  const Router = useRouter();

  const handleChange = ({ target }: { target: HTMLInputElement }) => {
    const {name, value} = target;
    setCredential({ ...credential, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email: credential.email,
      password: credential.password,
    });

    if (res?.status === 200) {
      await Router.push('/');
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={ handleSubmit }>
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
        type='submit'
      >
        Login
      </button>
    </form>
  );
}
