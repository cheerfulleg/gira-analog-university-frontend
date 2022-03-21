import LoginOrLogout from "./LoginOrLogout";
import RegisterOrProfile from "./RegisterOrProfile";
import {AppBar, Link, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";

function Nav() {
    const loggedIn = () => {
        return localStorage.getItem('token')
    }
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                    <Link href='/'> Jira Analog</Link>
                </Typography>
                <nav>
                    <RegisterOrProfile loggedIn={loggedIn()}/>
                    <LoginOrLogout loggedIn={loggedIn()}/>
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
