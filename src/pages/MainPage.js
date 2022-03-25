import React, {useEffect, useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from "axios";
import {a11yProps, TabPanel} from "../components/TabPanel";
import MainPagePanel from "../components/MainPagePanel";

function MainPage() {

    const [projects, setProjects] = useState([])
    const [myProjects, setMyProjects] = useState([])
    const [value, setValue] = useState(0)

    useEffect(() => {
        getProjects()
        getMyProjects()
    }, [])

    const getProjects = () => {
        axios.get('/projects')
            .then(res => setProjects(res.data))
            .catch(err => console.log(err))
    }
    const getMyProjects = () => {
        axios.get('/projects/my')
            .then(res => setMyProjects(res.data))
            .catch(e => console.log(e))
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
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
