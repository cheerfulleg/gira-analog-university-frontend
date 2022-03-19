import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";

function Register() {
    const [formValue, setFormValue] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });
     const handleSubmit = async () => {
        axios.post("/user", formValue)
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }
    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>Registration Form</p>
                <input
                    type="email"
                    name="email"
                    placeholder="enter an email"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="first_name"
                    placeholder="enter your first name"
                    value={formValue.first_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="enter your last name"
                    value={formValue.last_name}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="enter a password"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            <Link to='/forgot-password'>Forgot password?</Link>
        </>
    )
}

export default Register
