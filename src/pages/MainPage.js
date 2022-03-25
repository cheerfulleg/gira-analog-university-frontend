import React, {useEffect, useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from "axios";
import {a11yProps, TabPanel} from "../components/TabPanel";
import MainPagePanel from "../components/MainPagePanel";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProjectCreateModal from "../components/ProjectCreateModal";
import {useSnackbar} from "notistack";

function MainPage() {

    const [projects, setProjects] = useState([])
    const [myProjects, setMyProjects] = useState([])
    const [value, setValue] = useState(0)
    const [open, setOpen] = React.useState(false);

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();


    const handleResponseVariant = (info) => {
        enqueueSnackbar(info.message, {variant: info.variant});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getProjects()
        getMyProjects()
    }, [])

    const getProjects = () => {
        axios.get('/projects')
            .then(res => setProjects(res.data))
            .catch(err => handleResponseVariant({message: `Something went wrong: ${err}`, variant: 'error'}))
    }
    const getMyProjects = () => {
        axios.get('/projects/my')
            .then(res => setMyProjects(res.data))
            .catch(err => handleResponseVariant({message: `Something went wrong: ${err}`, variant: 'error'}))
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const createProject = (data) => {
        axios.post('/projects', data)
            .then(res => {
                setProjects(projects.concat(res.data))
                setMyProjects(myProjects.concat(res.data))
                handleClose()
            })
            .catch(err => handleResponseVariant({message: `Something went wrong: ${err}`, variant: 'error'}))
    }

    return (
        <Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Button variant="outlined" onClick={handleClickOpen}
                        sx={{
                            marginRight: 1,
                            float: 'right'
                        }}>
                    <AddIcon/> Create Project
                </Button>
                <ProjectCreateModal open={open} handleClose={handleClose} createProject={createProject}/>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="All projects" {...a11yProps(0)} />
                    <Tab label="My projects" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <MainPagePanel projects={projects}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MainPagePanel projects={myProjects}/>
            </TabPanel>
        </Box>
    )

}

export default MainPage
