import LoginLogout from "./LoginLogout";
import RegisterProfile from "./RegisterProfile";
import {Link} from "react-router-dom";

function Nav() {
    const loggedIn = () => {
        return localStorage.getItem('token')
    }
    return (
        <>
            <Link to='/'>Jira Analog University</Link>
            <LoginLogout loggedIn={loggedIn()}/>
            <RegisterProfile loggedIn={loggedIn()}/>
        </>
    )
}

export default Nav
