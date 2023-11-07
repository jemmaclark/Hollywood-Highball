import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    console.log(e.target.name);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} action="">
        <label htmlFor="">Email</label>
        <input type="email" onChange={handleChange} name="email" />
        <label htmlFor="">Password</label>
        <input type="password" onChange={handleChange} name="password" />
        <button>Login</button>
      </form>
    </section>
  );
}
