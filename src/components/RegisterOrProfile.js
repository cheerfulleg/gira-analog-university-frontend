import {Link} from "@mui/material";

function RegisterOrProfile(props) {
    return (
        <>
            {
                props.loggedIn ?
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/profile"
                        sx={{my: 1, mx: 1.5}}
                    >
                        Profile
                    </Link>
                    :
                    <Link href='/register'
                          variant="button"
                          color="text.primary"
                          sx={{my: 1, mx: 1.5}}>Register</Link>
            }
        </>
    )
}

export default RegisterOrProfile
