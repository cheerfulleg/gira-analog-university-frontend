import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Autocomplete} from "@mui/material";


function AddTeamMate({users, addMember}) {
    const [addMode, setAddMode] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userRole, setUserRole] = useState('')

    const toggleInputMode = () => {
        setAddMode(!addMode)
    }

    const handleChangeAutocomplete = (event, value) => {

        setUserId(value.id)
    }

    const handleChangeRole = (event) => {
        setUserRole(event.target.value)
    }

    const handleClick = () => {
        toggleInputMode()
        addMember({user_id: userId, role: userRole})
    }

    if (!addMode) {
        return (
            <Button variant="outlined" onClick={toggleInputMode}>
                <AddIcon/> add teammate
            </Button>
        )
    } else {
        return (
            <Box sx={{
                width: "360px"
            }}>
                <Autocomplete
                    name="user_id"
                    getOptionLabel={(option) => option.email}
                    renderInput={params => <TextField {...params} label="Choose user *"/>}
                    options={users}
                    onChange={handleChangeAutocomplete}
                />
                <Box sx={{
                    marginTop: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TextField
                        size="middle"
                        id="role"
                        label="Add Role (optional)"
                        name="role"
                        autoFocus
                        onChange={handleChangeRole}
                    />
                    <Button sx={{
                        marginX: "15px"
                    }}
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                    >
                        Add
                    </Button>
                    <Button size="large"
                            variant="contained"
                            color="error"
                            onClick={toggleInputMode}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        )
    }
}

export default AddTeamMate
