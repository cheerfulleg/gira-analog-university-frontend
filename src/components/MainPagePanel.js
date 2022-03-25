import ProjectItem from "./ProjectItem";
import React from "react";
import Grid from "@mui/material/Grid";

function MainPagePanel({projects}) {
    return (
        <Grid container spacing={2}>
            {projects.map(project =>
                <Grid item key={project.id}>
                    <ProjectItem key={project.id} elevation={4} project={project}/>
                </Grid>
            )}
        </Grid>
    )
}

export default MainPagePanel
