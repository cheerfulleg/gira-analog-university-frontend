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


function Project() {
    const [project, setProject] = useState('')
    const params = useParams()

    useEffect(() => {
        axios.get(`/projects/${params.id}`)
            .then(res => setProject(res.data))
            .catch(e => console.log(e))
    }, [])

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
        console.log(project)
    }

    const handleColumnRemove = (board, column) => {
        axios.delete(`/projects/${project.id}/column/${column.id}`)
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    return (
        <Box>
            Project
            <Typography>{project.id}</Typography>
            <Typography>{project.name}</Typography>
            <Typography>{project.description}</Typography>
            {project ?
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
                                   projectId={project.id}
                                   members={project.team_members}
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
                /> : null
            }
        </Box>
    )

}

export default Project
