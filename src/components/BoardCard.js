import {Autocomplete, Card, CardActions, CardContent, CardHeader, IconButton, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {DeleteOutline} from "@mui/icons-material";
import React, {useState} from "react";
import Box from "@mui/material/Box";

function BoardCard({card, removeCard, members, assignMember}) {

    const [inputMode, setInputMode] = useState(false)
    const [assignee, setAssignee] = useState(card.assignee
        ? members.find(o => o.id === card.assignee.id) : null)

    const toggleInputMode = () => {
        setInputMode(!inputMode)
    }

    const handleChange = (event, value) => {
        setAssignee(value)
        assignMember(card, value)
    }

    const handleClose = () => {
        toggleInputMode()
    }

    return (
        <Card sx={{minWidth: 250}}>
            <CardHeader
                action={
                    <IconButton onClick={removeCard}>
                        <DeleteOutline/>
                    </IconButton>
                }
                title={card.title}
            />
            <CardContent>
                <Typography variant="body2">
                    {card.description}
                </Typography>
            </CardContent>
            {!inputMode ?
                <CardActions>
                    {assignee ?
                        <Box>
                            <Button size="small" onClick={toggleInputMode}>Reassign</Button>
                            <Typography variant="body2">
                                {assignee.user.email}{assignee.role ? " - " + assignee.role : null}
                            </Typography>
                        </Box>
                        :
                        <Button size="small" onClick={toggleInputMode}>Assign</Button>
                    }
                </CardActions> :
                <Box sx={{
                    padding: 1,
                }}>
                    <Button sx={{
                        float: "right",
                        height: "100%",
                        marginTop: 1
                    }}
                            variant="contained"
                            color="error"
                            onClick={toggleInputMode}>
                        Cancel
                    </Button>
                    <Autocomplete sx={{
                        marginRight: "40%"
                    }}
                                  getOptionLabel={(option) => option.user.email}
                                  renderInput={params => <TextField {...params} label="Choose user"/>}
                                  options={members}
                                  onChange={handleChange}
                                  onClose={handleClose}

                    />
                </Box>
            }
        </Card>
    )
}

export default BoardCard
