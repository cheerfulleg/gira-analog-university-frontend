import axios from "axios";
import {useState} from "react";

function ForgotPassword() {
    const [formValue, setFormValue] = useState({
        email: '',
    });
    const handleSubmit = async () => {
        axios.post("/user/reset-password", null, {
            params: {
                email: formValue.email
            }
        })
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
                <p>Forgot password Form</p>
                <input
                    type="email"
                    name="email"
                    placeholder="enter an email"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default ForgotPassword
