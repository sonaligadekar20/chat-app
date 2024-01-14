import axios from 'axios'
import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginNow = async () => {
        try {
            const { data } = await axios.post('/login', { email, password });
            alert(data.message);
            if (data) {
                localStorage.setItem('user', JSON.stringify(data?.data));
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <input type="text"
                    placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='form-control mt-3'
                />

                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='form-control mt-3'
                />

                <button onClick={loginNow} type='button'
                    className='btn btn-primary d-block mt-5 w-50 mx-auto'
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;