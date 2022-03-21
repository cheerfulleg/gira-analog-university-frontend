import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Link} from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Grid container justifyContent="center">
                <Typography variant="body1">
                    Copyright © <Link>Jira Analog</Link> {new Date().getFullYear()}
                </Typography>
            </Grid>
        </Box>
    )
}

export default Footer
