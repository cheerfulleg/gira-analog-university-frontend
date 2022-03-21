import {Link} from "react-router-dom";

function RegisterOrProfile(props) {
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

export default RegisterOrProfile
