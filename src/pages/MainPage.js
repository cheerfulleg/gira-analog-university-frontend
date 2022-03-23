import React from "react";
import {styled} from '@mui/material/styles';
import {Paper} from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    marginTop: '15px',
    marginBottom: '15px'
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class MainPage extends React.Component {
    state = {
        isLoaded: false,
        value: 0
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
                    <TabPanel value={value} index={0}>
                        {projects.map(project => (
                            <Item key={project.id} elevation={4}>
                                {project.name}
                            </Item>
                        ))}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {myProjects.map(project => (
                            <Item key={project.id} elevation={4}>
                                {project.name}
                            </Item>
                        ))}
                    </TabPanel>
                </Box>
            )
        } else {
            return (<>Loading....</>)
        }
    }
}

export default MainPage
