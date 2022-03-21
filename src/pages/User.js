import React from "react";
import axios from "axios";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";


class User extends React.Component {
    state = {isLoaded: false}

    componentDidMount() {
        axios.get('/user')
            .then(res => {
                this.setState({user: res.data, isLoaded: true})
            })
            .catch(e => console.log(e))
    }

    render() {
        const {isLoaded, user} = this.state
        if (isLoaded) {
            return (
                <>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                        <Typography component="h1" variant="h4" align="center">
                            Profile
                        </Typography>
                    </Paper>
                    <Typography gutterBottom variant="h4" component="span" sx={{mb: 4, mr: 3}}>
                        {user.first_name}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="span">
                        {user.last_name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" sx={{mt:4}}>
                        {user.email}
                    </Typography>
                </>
            )
        } else {
            return (<>Loading....</>)
        }
    }
}

export default User
