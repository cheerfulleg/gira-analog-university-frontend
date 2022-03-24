import {Card, CardActions, CardContent, CardHeader, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {DeleteOutline} from "@mui/icons-material";

function BoardCard(props) {
    const {content, removeCard} = props
    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader
                action={
                    <IconButton onClick={removeCard}>
                        <DeleteOutline />
                    </IconButton>
                }
                title={content.title}
            />
            <CardContent>
                <Typography variant="body2">
                    {content.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Assign</Button>
            </CardActions>
        </Card>
    )
}

export default BoardCard
