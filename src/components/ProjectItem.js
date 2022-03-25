import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

function ProjectItem({project}) {
    return (
        <Link underline="none"
              key={project.id}
              href={`/project/${project.id}`}>
            <Card sx={{ width: 275, minHeight: 130}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {project.name}
                    </Typography>
                    <Typography variant="body2">
                        {project.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Link>

    );
}

export default ProjectItem
