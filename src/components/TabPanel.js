import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";
import {Link} from "@mui/material";
import Item from "./ProjectItem";

function TabPanel(props) {
    const {children, parentLink, value, index, ...other} = props;

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
                    <Box>
                        {children.map(child => (
                            <Link key={child.id} href={`/${parentLink}/${child.id}`}>
                                <Item key={child.id} elevation={4}>
                                    {child.name}
                                </Item>
                            </Link>
                        ))}
                    </Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.array,
    parentLink: PropTypes.string,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default TabPanel
