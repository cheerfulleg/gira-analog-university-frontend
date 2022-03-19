import {useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import qs from "qs";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const login = () => {
        const data = {
            username: username,
            password: password
        }
        axios.post('/token',
            qs.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(res => {
            localStorage.setItem('token', res.data.access_token)
            navigate('/')
        }).catch(e => console.log(e))
    }
    return (
        <div>
            <input
                type="text"
                placeholder="username..."
                onChange={event => {setUsername(event.target.value)}}
            />
            <input
                type="password"
                placeholder="password..."
                onChange={event => {setPassword(event.target.value)}}
            />
            <button onClick={login}>Login</button>
            <Link to='/forgot-password'>Forgot password?</Link>
        </div>
    );
}

export default Login
