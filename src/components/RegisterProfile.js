import {Link} from "react-router-dom";

function RegisterProfile(props) {
    return (
        <>
            {
                props.loggedIn ?
                    <Link to='/profile'>Profile</Link> :
                    <Link to='/register'>Register</Link>
            }
        </>
    )
}

export default RegisterProfile
