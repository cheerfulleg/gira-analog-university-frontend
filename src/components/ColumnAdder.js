import React, {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ColumnAdder = ({addColumn}) => {
    const [inputMode, setInputMode] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')

    const toggleInputMode = () => {
        setInputMode(!inputMode)
    }
    const handleChange = (event) => {
        setColumnTitle(event.target.value)
    }

    return (
        <Box sx={{
            padding: "15px",
            width: 280,
            height: 28
        }}>
            {!inputMode ?
                <Button sx={{
                    width: "100%",
                    alignItems: "center",
                    marginY: 1,
                    padding: 3
                }} variant="contained"
                        onClick={toggleInputMode}>
                    Add Column
                </Button>
                : <Box>
                    <TextField margin="normal"
                               required
                               fullWidth
                               id="username"
                               label="Column Title"
                               name="columnTitle"
                               autoFocus
                               onChange={handleChange}
                    />
                    <Button sx={{
                        marginRight: "10px"
                    }}
                            variant="contained"
                            onClick={() => {
                                addColumn({
                                    id: new Date().getTime(), title: columnTitle, cards: []
                                })
                                toggleInputMode()
                            }}>
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={toggleInputMode}>
                        Cancel
                    </Button>
                </Box>
            }
        </Box>
    )
}
export default ColumnAdder
