import React, {useEffect, useState} from "react"
import Box from "@mui/material/Box";
import axios from "axios";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Board from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import BoardCard from "../components/BoardCard";
import findNewCard from "../services/utils";
import ColumnAdder from "../components/ColumnAdder";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {a11yProps, TabPanel} from "../components/TabPanel";
import MemberItem from "../components/MemberItem";
import AddTeamMate from "../components/AddTeamMate";
import Grid from "@mui/material/Grid";


function Project() {
    const [project, setProject] = useState('')
    const [projectMembers, setProjectMembers] = useState([])
    const [users, setUsers] = useState([])
    const [value, setValue] = useState(0)
    const params = useParams()

    useEffect(() => {
        getProject()
        getUsers()
    }, [])

    const getProject = () => {
        axios.get(`/projects/${params.id}`)
            .then(res => {
                setProject(res.data)
                setProjectMembers(res.data.team_members)
            })
            .catch(e => console.log(e))
    }

    const getUsers = () => {
        axios.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }

    const handleDragEnd = (board, card, source, destination) => {
        axios.patch(`/projects/${board.id}/task/${card.id}`,
            {column_id: destination.toColumnId}
        )
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    const handleCardRemove = (board, column, card) => {
        axios.delete(`/projects/${project.id}/task/${card.id}`,
        )
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    const handleCardAdd = (board, column) => {
        const newCard = findNewCard(project, board)
        axios.post(`/projects/${project.id}/column/${column.id}/task`, newCard)
            .then(res => setProject(res.data))
            .catch(err => console.log(err))

    }
    const handleAddColumn = (board, column) => {
        axios.post(`/projects/${project.id}/column`, {title: column.title})
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    const handleColumnRemove = (board, column) => {
        axios.delete(`/projects/${project.id}/column/${column.id}`)
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    const handleChange = (event, value) => {
        setValue(value)
    }

    const removeMember = (id) => {
        const newList = projectMembers.filter(item => item.id !== id);
        setProjectMembers(newList)
        axios.delete(`/projects/${project.id}/member/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const updateMember = (id, data) => {
        axios.patch(`/projects/${project.id}/member/${id}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const assignMember = (card, value) => {
        axios.patch(`/projects/${project.id}/task/${card.id}/assign`,
            {assignee_id: value.id})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const addTeamMember = (data) => {
        const newMember = users.find(item => item.id === data.user_id)

        console.log(projectMembers)
        axios.post(`/projects/${project.id}/member`, data)
            .then(res => {
                setProjectMembers(projectMembers.concat({
                    id: res.data.id,
                    role: res.data.role,
                    user: newMember
                }))
            })
            .catch(err => console.log(err))
    }

    if (project) {
        return (
            <Box>
                <Typography variant='h3'>{project.name}</Typography>
                <Typography variant='body1'>{project.description}</Typography>
                <Box sx={{
                    marginTop: 2,
                    borderBottom: 1,
                    borderColor: 'divider'
                }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Board" {...a11yProps(0)} />
                        <Tab label="Team" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>

                    <Board
                        allowAddColumn
                        allowRemoveCard
                        disableColumnDrag
                        allowRemoveColumn
                        onCardDragEnd={handleDragEnd}
                        onCardRemove={handleCardRemove}
                        onLaneRename={console.log}
                        initialBoard={project}
                        allowAddCard={{on: "top"}}

                        renderCard={(content, {removeCard, dragging}) =>
                            <BoardCard card={content}
                                       dragging={dragging}
                                       removeCard={removeCard}
                                       assignMember={assignMember}
                                       members={projectMembers}
                            />
                        }
                        onNewCardConfirm={(draftCard) => ({
                            id: new Date().getTime(),
                            ...draftCard
                        })}
                        onCardNew={handleCardAdd}

                        onNewColumnConfirm={(newColumn) => ({
                            id: new Date().getTime(),
                            ...newColumn
                        })}

                        onColumnNew={handleAddColumn}
                        renderColumnAdder={({addColumn}) => <ColumnAdder addColumn={addColumn}/>}
                        onColumnRemove={handleColumnRemove}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AddTeamMate users={users} addMember={addTeamMember}/>
                    <Grid container spacing={2}>
                        {projectMembers.map(member =>
                            <Grid item>
                                <MemberItem key={member.user.id}
                                            elevation={2}
                                            member={member}
                                            onRemove={removeMember}
                                            onUpdate={updateMember}
                                />
                            </Grid>
                        )}
                    </Grid>
                </TabPanel>
            </Box>
        )
    } else {
        return <>Loading...</>
    }

}

export default Project
