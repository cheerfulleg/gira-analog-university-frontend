import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";


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
                    <Button onClick={logout}
                            variant="outlined"
                            sx={{my: 1, mx: 1.5}}>
                        Logout
                    </Button>
                    :
                    <Button href="/login"
                            variant="outlined"
                            sx={{my: 1, mx: 1.5}}>
                        Login
                    </Button>
            }
        </>
    )

}

export default LoginOrLogout
