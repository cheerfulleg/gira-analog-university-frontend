import React from "react";
import axios from "axios";


class User extends React.Component {
    state = {isLoaded: false}

    componentDidMount() {
        axios.get('/user')
            .then(res => {
                this.setState({user: res.data, isLoaded: true})
                console.log(this.state.user)
            })
            .catch(e => console.log(e))
    }

    render() {
        const {isLoaded, user} = this.state
        if (isLoaded) {
            return (
                <>
                    <p>User</p>
                    <p>{user.email}</p>
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                </>
            )
        } else {
            return (<>Loading....</>)
        }
    }
}

export default User
