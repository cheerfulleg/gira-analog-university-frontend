import {styled} from "@mui/material/styles";
import {IconButton, Paper} from "@mui/material";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import {DeleteOutline} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    width: 360,
    lineHeight: '60px',
    marginTop: '15px',
    marginBottom: '15px'
}));

function MemberItem({member, onRemove, onUpdate}) {
    const [editMode, setEditMode] = useState(false)
    const [role, setRole] = useState(member.role ? member.role : null)

    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleChange = (event) => {
        setRole(event.target.value)
    }

    const handleClick = () => {
        handleEditMode()
        onUpdate(member.id, {role})
    }

    if (!editMode) {
        return (
            <Item>
                {member.user.email} {role ? " - " + role : null}
                <Box sx={{float: "right"}}>
                    <IconButton onClick={handleEditMode}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => onRemove(member.id)}>
                        <DeleteOutline/>
                    </IconButton>
                </Box>
            </Item>
        )
    } else {
        return (
            <Item sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextField
                    size="small"
                    required
                    id="role"
                    label="Edit Role"
                    name="role"
                    autoFocus
                    onChange={handleChange}
                />
                <Button sx={{
                    marginX: "5px"
                }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}>
                    Edit
                </Button>
                <Button size="small"
                        variant="contained"
                        color="error"
                        onClick={handleEditMode}>
                    Cancel
                </Button>
            </Item>
        )
    }
}

export default MemberItem
