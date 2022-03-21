import axios from "axios";
import {useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../services/theme";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Link} from "@mui/material";
import {useSnackbar} from "notistack";

function ForgotPassword() {
    const [formValue, setFormValue] = useState({
        email: '',
    });
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const handleResponseVariant = (info) => () => {
        enqueueSnackbar(info.message, {variant: info.variant});
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post("/user/reset-password", null, {
            params: {
                email: formValue.email
            }
        })
            .then(handleResponseVariant({message: 'Email sent successfully', variant: 'success'}))
            .catch(handleResponseVariant({message: 'Something went wrong', variant: 'error'}))
    }
    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send email
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Return to main page"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default ForgotPassword
