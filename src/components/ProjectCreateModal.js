import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";

function ProjectCreateModal({open, handleClose, createProject}) {
    const [formValue, setFormValue] = useState({
        name: '',
        description: ''
    })

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleCreateProject = () => {
      createProject(formValue)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create new project</DialogTitle>
            <DialogContent>
                <TextField autoFocus
                           id="name"
                           name="name"
                           margin="dense"
                           label="Project Title"
                           required
                           type="text"
                           fullWidth
                           onChange={handleChange}
                />
                <TextField
                    placeholder="Description (optional)"
                    id="description"
                    name="description"
                    multiline
                    rows={3}
                    maxRows={6}
                    fullWidth
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined"
                        color="error"
                        onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleCreateProject}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProjectCreateModal
