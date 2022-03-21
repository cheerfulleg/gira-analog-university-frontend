import LoginOrLogout from "./LoginOrLogout";
import RegisterOrProfile from "./RegisterOrProfile";
import {Link} from "react-router-dom";

function Nav() {
    const loggedIn = () => {
        return localStorage.getItem('token')
    }
    return (
        <>
            <Link to='/'>Jira Analog University</Link>
            <LoginOrLogout loggedIn={loggedIn()}/>
            <RegisterOrProfile loggedIn={loggedIn()}/>
        </>
    )
}

export default Nav
