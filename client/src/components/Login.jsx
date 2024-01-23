import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      navigate('/home');
    } else {
      console.error(data.message);
    }
  };

  return (
    <div>
      <h2 className='text-center p-10 text-indigo-600 text-2xl'>Login</h2>
      <form>
        <div className='flex justify-center'>
            <div>
                <div>
                <div className='flex justify-center'>
                <label className='text-indigo-600'>
                    Username
                </label>
                </div>
                <div className='flex justify-center'>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='border border-indigo-600 rounded-full pl-2'    />
                </div>
                </div>
                <br />
                <div>
                    <div className='flex justify-center'>
                        <label className='text-indigo-600'>
                            Password
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border border-indigo-600 rounded-full pl-2'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-center p-5'>
        <button type="button" onClick={handleLogin} className='bg-indigo-600 text-white px-5 py-1 rounded-full shadow-md'>
          Login
        </button>
        </div>
      </form>
    </div>
  );
}

export default Login;