import axios from 'axios';
import React, { useEffect } from 'react';
import useLoading from '../hook/useLoading';
import useUser from '../hook/useUser';

function AdminLogin() {
  const { loginToWordpress } = useUser();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const login = e.target.querySelector("#login").value;
      const pass = e.target.querySelector("#pass").value;
      loginToWordpress({
        login: login,
        pass: pass,
      })
    }}>
      <input id="login" type="text" name={"login"} />
      <input id="pass" type="text" name={"pass"} />
      <button>입력</button>
    </form>
  );
}

export default AdminLogin;