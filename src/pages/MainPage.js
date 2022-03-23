import React from "react";
import {Link} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from "axios";
import TabPanel from "../components/TabPanel";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class MainPage extends React.Component {
    state = {
        isLoaded: false,
        value: 0,
        projects: [],
        myProjects: [],
    }

    componentDidMount() {
        axios.get('/projects')
            .then(res => {
                this.setState({projects: res.data})
            })
            .catch(e => console.log(e))
        axios.get('/projects/my')
            .then(res => {
                this.setState({myProjects: res.data, isLoaded: true})
            })
            .catch(e => console.log(e))
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    render() {
        const {isLoaded, projects, myProjects, value} = this.state
        if (isLoaded) {
            return (
                <Box>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={this.handleChange} aria-label="basic tabs example">
                            <Tab label="All projects" {...a11yProps(0)} />
                            <Tab label="My projects" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} children={projects} parentLink={'project'}/>
                    <TabPanel value={value} index={1} children={myProjects} parentLink={'project'}/>
                </Box>
            )
        } else if (!!isLoaded) {
            return (<>Loading....</>)
        } else {
            return <Link href='/login'>Unauthorized: Login first</Link>
        }
    }
}

export default MainPage
