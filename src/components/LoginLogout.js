import {Link, useNavigate} from "react-router-dom";


function LoginLogout(props) {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/')
    }
    return (
        <>
            {
                 props.loggedIn ?
                    <button onClick={logout}>Logout</button> :
                    <Link to='/login'>Login</Link>
            }
        </>
    )

}

export default LoginLogout
