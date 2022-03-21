import {Link, useNavigate} from "react-router-dom";


function LoginOrLogout(props) {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/')
        window.location.reload(true)
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

export default LoginOrLogout
